import React from 'react'
import AboutContent from '../components/MainContent/AboutContent'
import SideBar from '../components/SideBar'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { metadata } from '../layout'
import './style.css'

export default function Sobre() {
    metadata.title = 'Sobre'
    return (
        <div>
            <div className="flex min-h-screen flex-row justify-start">
                <SideBar />
                <div className='mainContainer border-l'>
                    <Header page_index={1} />
                    <main>
                        <AboutContent />
                    </main>
                </div>
            </div>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}