import React from 'react'
import { metadata } from '../layout'
import SideBar from '../components/SideBar'
import AboutContent from '../components/MainContent/AboutContent'
import './style.css'
import Header from '../components/Header'

const Sobre = () => {
    metadata.title = 'Sobre'
    return (
        <main className="flex min-h-screen flex-row justify-start">
            <SideBar />
            <div className='mainContainer border-l'>
                <Header />
                <AboutContent />
            </div>
        </main>
    )
}

export default Sobre