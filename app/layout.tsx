import clsx from 'clsx'
import { MessageCircleQuestionMark } from 'lucide-react'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'
import styles from './layout.module.css'

const nunito = Nunito({
  variable: '--font-nunito',
  subsets: ['cyrillic', 'latin'],
})

export const metadata: Metadata = {
  title: 'BlurQuest: AI-based Guessing Game',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const description = 'Guess what the AI is thinking of'

  return (
    <html lang="en" className={nunito.variable}>
      <body>
        <main className={styles.main}>
          <header className={styles.header}>
            <div className={styles.title}>
              <MessageCircleQuestionMark size={36} />
              &nbsp;
              <div>
                <h1>BlurQuest</h1>
                <p className={clsx(styles.description, styles.mobile)}>
                  {description}
                </p>
              </div>
            </div>
            <p className={clsx(styles.description, styles.desktop)}>
              {description}
            </p>
          </header>
          <section className={styles.content}>{children}</section>
        </main>
      </body>
    </html>
  )
}
