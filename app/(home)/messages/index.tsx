import { UIDataTypes, UIMessage, UITools } from 'ai'
import clsx from 'clsx'
import { useLayoutEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import styles from './messages.module.css'

type Props = {
  messages: UIMessage<unknown, UIDataTypes, UITools>[]
  isPending: boolean
}

export default function Messages({ messages, isPending }: Props) {
  const chatEndRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    chatEndRef.current?.scrollIntoView()
  }, [messages])

  const getMessageContent = (
    message?: UIMessage<unknown, UIDataTypes, UITools>,
  ) => {
    const content = message?.parts
      .map((part, i) =>
        part.type === 'text' ? (
          <ReactMarkdown key={`${message.id}-${i}`}>{part.text}</ReactMarkdown>
        ) : undefined,
      )
      .filter(Boolean)

    return content?.length ? content : 'Thinking…'
  }

  return (
    <div className={styles.chat}>
      {messages.map((message) => (
        <div
          key={message.id}
          className={clsx(
            styles.message,
            message.role === 'user' ? styles.msg_user : styles.msg_ai,
          )}
        >
          {getMessageContent(message)}
        </div>
      ))}
      {isPending && (
        <div key="pending" className={clsx(styles.message, styles.msg_ai)}>
          {getMessageContent()}
        </div>
      )}
      <div ref={chatEndRef} />
    </div>
  )
}
