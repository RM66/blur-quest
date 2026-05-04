import { useCallback, useEffect, useRef } from 'react'

export const useSpeechSynthesis = () => {
  const synth =
    typeof window !== 'undefined' ? window.speechSynthesis : undefined

  const voice = useRef<SpeechSynthesisVoice | null>(null)

  useEffect(() => {
    if (voice.current) return

    voice.current =
      synth
        ?.getVoices()
        .find((v) =>
          [
            'Google US English',
            'com.apple.voice.compact.en-GB.Daniel',
          ].includes(v.voiceURI),
        ) || null
  }, [synth])

  const pronounce = useCallback(
    (text: string) => {
      if (!synth) {
        console.warn('Speech synthesis is not supported')
        return
      }

      synth.cancel()

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = navigator.language
      utterance.pitch = 1.5
      utterance.voice = voice.current

      synth.speak(utterance)
    },
    [synth],
  )

  return pronounce
}
