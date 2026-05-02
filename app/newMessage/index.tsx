'use client'
import clsx from 'clsx'
import { CircleStop, Mic, Send } from 'lucide-react'
import { useState } from 'react'
import styles from './styles.module.css'
import { useSpeechRecognition } from './useSpeechRecognition'
import { useIsHydrated } from './useisHydrated'

export default function NewMessage() {
  const isHydrated = useIsHydrated()
  const [text, setText] = useState('')

  const { isListening, isSupported, start, stop } =
    useSpeechRecognition(setText)

  return (
    <form className={styles.form}>
      {isHydrated && isSupported && (
        <button
          className={clsx(styles.button, styles.btn_mic)}
          type="button"
          onClick={isListening ? stop : start}
        >
          {isListening ? <CircleStop /> : <Mic />}
        </button>
      )}
      <textarea
        className={styles.textarea}
        name="message"
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={isListening}
      />
      <button className={clsx(styles.button, styles.btn_send)}>
        <Send />
      </button>
    </form>
  )
}
