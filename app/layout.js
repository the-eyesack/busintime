import './globals.css'
import { Chonburi, Noto_Sans} from 'next/font/google'

const chonburi = Chonburi({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-chonburi',
})

const noto_sans = Noto_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-noto-sans',
})

export const metadata = {
  title: 'Bus in Time',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${chonburi.variable} ${noto_sans.variable}`}>
    <body className={'p-4 overflow-x-hidden'}>
        {children}
      </body>
    </html>
  )
}
