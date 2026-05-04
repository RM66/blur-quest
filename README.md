# BlurQuest: AI-based Guessing Game

BlurQuest is an interactive web-based guessing game where artificial intelligence selects a secret word from a chosen category, and the user tries to guess it. The AI provides hints in the form of "hot" or "cold," and also shows a blurred image that becomes clear upon the correct answer.

## Features

- **AI Hints**: Uses Google Gemini to generate hints and manage the game.
- **Visual Hints**: Blurred images from Unsplash that become clear when guessed.
- **Voice Features**: Support for speech synthesis and voice recognition for convenience.
- **Categories**: Choice from predefined categories or suggest your own.
- **Statistics**: Tracking time and number of attempts.

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **AI**: Google Gemini 3.1 Flash Lite (via AI SDK)
- **Images**: Unsplash API
- **Styling**: CSS Modules
- **Icons**: Lucide React
- **Validation**: Zod
- **Markdown**: React Markdown
- **Tools**: ESLint, Husky

## Getting Started

### Prerequisites

- Node.js
- pnpm (or npm/yarn)
- API keys for Vercel API Gateway, Google AI, Unsplash will be required

### Installation

```bash
pnpm install
```

### Running in Development Mode

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
pnpm build
pnpm start
```

### Linting

```bash
pnpm lint
```

## Project Structure

- `app/(home)/` — Main game page with components in subfolders for displaying and sending messages
- `app/api/chat/` — API endpoint for AI chat

## How to Play

1. Choose a category or suggest your own.
2. AI will select a secret word and show a blurred image.
3. Make guesses, receiving "hot" or "cold" hints.
4. When you guess correctly, the image will clear, and you'll see statistics.
5. Start a new game!
