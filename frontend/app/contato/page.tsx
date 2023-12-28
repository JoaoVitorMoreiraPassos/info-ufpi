import React from 'react'
import ContactContent from '../components/MainContent/ContactContent'
import SideBar from '../components/SideBar'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Contato = () => {
    return (
        <div>
            <div className="flex min-h-screen flex-row justify-start">
                <SideBar />
                <div className='mainContainer border-l'>
                    <Header page_index={1} />
                    <main className='h-full'>
                        <ContactContent />
                    </main>
                </div>
            </div>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}

export default Contato
