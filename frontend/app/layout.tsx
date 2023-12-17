
import type { Metadata } from 'next'
import './globals.css'
import "@fortawesome/fontawesome-svg-core/styles.css";
import Footer from './components/Footer'
import { Inria_Serif, Inter } from 'next/font/google';
import { config } from "@fortawesome/fontawesome-svg-core";
import SideBar from './components/SideBar'
import Header from './components/Header'
// Tell Font Awesome to skip adding the CSS automatically 
// since it's already imported above
config.autoAddCss = false;

const inter = Inter({ subsets: ['latin'] })

export let metadata: Metadata = {
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
        {children}
      </body>
    </html>
  )
}
