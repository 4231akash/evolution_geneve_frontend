// app/layout.js
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import ViewportHeightFix from '../components/ViewPortHeightFix'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap'
})

export const metadata = {
  title: 'Evolution of Timekeeping',
  description: 'Explore the evolution of timekeeping through history',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body>
        <ViewportHeightFix /> {/* ✅ Runs on client and sets --vh */}
        {children}
      </body>
    </html>
  )
}
