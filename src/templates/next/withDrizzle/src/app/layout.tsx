import '@/styles/globals.css'
import { Header } from '@/components/Header'

export const metadata = {
  title: 'Create CK App',
  description: 'Generated by ck-cli',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}