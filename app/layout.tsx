import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MUI Dashboard',
  description: 'Material-UI Dashboard Template',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-mui-color-scheme="light">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
        />
      </head>
      <body style={{ fontFamily: 'Roboto, sans-serif', margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}

