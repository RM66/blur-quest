import { useState, useRef } from 'react'

export const useSpeechRecognition = (setText: (text: string) => void) => {
  const SpeechRecognition =
    typeof window !== 'undefined'
      ? window.SpeechRecognition || window.webkitSpeechRecognition
      : undefined

  const [isListening, setIsListening] = useState(false)
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  const start = () => {
    if (!SpeechRecognition) {
      console.warn('Speech Recognition is not supported')
      return
    }

    const recognition = new SpeechRecognition()

    recognition.lang = navigator.language
    recognition.interimResults = true

    recognition.onresult = (event) => {
      let resultText = ''
      for (let i = 0; i < event.results.length; i++) {
        resultText += event.results[i][0].transcript
      }
      setText(resultText)
    }

    recognition.onstart = () => setIsListening(true)
    recognition.onend = () => setIsListening(false)

    recognition.start()
    recognitionRef.current = recognition
  }

  const stop = () => {
    recognitionRef.current?.stop()
  }

  return {
    isListening,
    isSupported: !!SpeechRecognition,
    start,
    stop,
  }
}
