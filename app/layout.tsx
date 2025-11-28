import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Price Windows and Doors - Commercial Double Glazing Specialists | Price, not pricey!',
  description: 'Commercial double glazing specialists for offices, retail, warehouses & industrial properties. High-quality windows and doors at affordable prices. Price, not pricey!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

