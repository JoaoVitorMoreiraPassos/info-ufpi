import React from 'react'
import { metadata } from './layout'
import HomeContent from '@/app/components/MainContent/HomeContent'
import SideBar from '@/app/components/SideBar'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import '@/app/globals.css'
import '@/app/style.css'

export default function Home() {
  metadata.title = 'Página Inicialn'
  return (
    <div>
      <div className="flex min-h-screen flex-row justify-start">
        <SideBar />
        <div className='mainContainer'>
          <Header page_index={0} />
          <main>
            <HomeContent />
          </main>
        </div>
      </div >
      <footer>
        <Footer />
      </footer>
    </div>
  )
}
