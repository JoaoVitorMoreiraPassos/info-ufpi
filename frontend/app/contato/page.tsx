import React from 'react'
import ContactContent from '../components/MainContent/ContactContent'
import SideBar from '../components/SideBar'
import Header from '../components/Header'
import Footer from '../components/Footer'
import '@/app/globals.css'

const Contato = () => {
    return (
        <div>
            <div className="flex min-h-screen flex-row justify-start">
                <SideBar />
                <div className='mainContainer'>
                    <Header page_index={2} />
                    <main >
                        <ContactContent />
                    </main>
                </div>
            </div>
            <footer >
                <Footer />
            </footer>
        </div>
    )
}

export default Contato
