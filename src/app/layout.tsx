import type { Metadata } from 'next'
import { Inter, Source_Sans_3 } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

const sourceSans3 = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-source-sans-3',
})

export const metadata: Metadata = {
  title: {
    default: 'TaskFlow',
    template: '%s | TaskFlow',
  },
  description:
    'TaskFlow is a task management application based on the Kanban method, developed to optimize your daily tasks.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${sourceSans3.variable} font-sans`}>
        {children}
      </body>
    </html>
  )
}
