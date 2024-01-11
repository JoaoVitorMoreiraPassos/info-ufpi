
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Inter } from 'next/font/google';
import './globals.css'
import type { Metadata } from 'next'
import { Auth } from "./components/Auth";
// Tell Font Awesome to skip adding the CSS automatically 
// since it's already imported above
config.autoAddCss = false;

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br" data-theme="light">
      <head>
        {/* Adicione a tag link para o ícone do título da página */}
        <link rel="icon" href="/logo.png" />
      </head>
      <body className={inter.className}>
        <Auth />
        {children}
      </body>
    </html>
  )
}
