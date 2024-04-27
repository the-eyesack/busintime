import './globals.css'
import { Analytics } from "@vercel/analytics/react"
export const metadata = {
  title: 'Bus in Time!',
  description: 'The most convenient way to find when your bus is coming.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <body className={'p-4 text-sans overflow-x-hidden'}>
      {children}
      <Analytics/>
    </body>
    </html>
  )
}
