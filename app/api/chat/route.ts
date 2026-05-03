import { google } from '@ai-sdk/google'
import {
  convertToModelMessages,
  stepCountIs,
  streamText,
  tool,
  UIMessage,
} from 'ai'
import { z } from 'zod'
import { fetchUnsplashImageUrl } from './unsplash'

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  const result = streamText({
    model: google('gemini-3.1-flash-lite-preview'),
    system: `
      Current session ID: ${Math.random()}.

      You are playing a guessing game with the user.
      Start the conversation by offering 5 categories to choose from for what you will think of (e.g., famous person, animal, food, country, movie, object, place).
      Ask the user to pick a category or suggest their own.
      Secretly pick a UNIQUE specific word (a single, concrete thing) from the category, do not repeat common choices. Do not reveal it until the user either guesses correctly or explicitly gives up.
    
      Rules:
      - The user makes guesses; you reply with "hot" or "cold" based on how close the guess is to the secret answer.
      - If the guess is somewhat close, you can use intermediate feedback like "warm", "cool", "very hot", etc., but keep it simple and consistent.
      - You may ask short clarifying questions when needed, but avoid giving away the answer.
      - The user can give up at any time. If they give up, reveal the answer and end the round.
      Win condition:
      - When the user guesses exactly right, congratulate them and report how long it took and how many user messages it took to guess. Estimate elapsed time from the conversation timestamps if available; otherwise, state that you are approximating based on the chat.
      Tone:
      - Friendly, playful, concise.

      CRITICAL:
      As soon as you pick the secret answer (and only once per round), you MUST call the tool setSecret with:
      - secret: the exact answer you picked
      After calling setSecret, continue the conversation normally without revealing the secret.

      CRITICAL:
      As soon as user guesses the word or gives up (and only once per round), you MUST call the tool finishGame.
      After calling finishGame, continue the conversation offering to play another round.

      Current time seed: ${Date.now()}.
    `,
    stopWhen: stepCountIs(5),
    tools: {
      setSecret: tool({
        description: 'Store the secret answer you picked for this round.',
        inputSchema: z.object({
          secret: z
            .string()
            .min(1)
            .max(120)
            .describe('The exact secret answer, without extra explanation'),
        }),
        execute: async ({ secret }) => {
          const imageUrl = await fetchUnsplashImageUrl(secret)
          return { imageUrl }
        },
      }),
      finishGame: tool({
        description: 'Call this when the user guesses the word or gives up.',
        inputSchema: z.object({}),
        execute: () => {
          return { finished: true }
        },
      }),
    },
    messages: await convertToModelMessages(messages),
  })

  return result.toUIMessageStreamResponse()
}
