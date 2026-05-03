import clsx from 'clsx'
import { CircleStop, Mic, Send } from 'lucide-react'
import { useState } from 'react'
import styles from './newMessage.module.css'
import { useSpeechRecognition } from './useSpeechRecognition'
import { useIsHydrated } from './useIsHydrated'

type Props = {
  sendMessage: ({ text }: { text: string }) => void
}

export default function NewMessage({ sendMessage }: Props) {
  const isHydrated = useIsHydrated()
  const [text, setText] = useState('')

  const { isListening, isSupported, start, stop } =
    useSpeechRecognition(setText)

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault()
        sendMessage({ text })
        setText('')
      }}
    >
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
        onKeyDown={(e) => {
          if (e.key !== 'Enter' || e.shiftKey) return
          e.preventDefault()
          e.currentTarget.form?.requestSubmit()
        }}
        disabled={isListening}
      />
      <button
        className={clsx(styles.button, styles.btn_send)}
        type="submit"
        aria-label="Send message"
      >
        <Send />
      </button>
    </form>
  )
}
