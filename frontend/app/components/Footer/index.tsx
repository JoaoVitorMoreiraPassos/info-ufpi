import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fontsource/roboto/300.css'
import React from 'react'
import Instagram from '@mui/icons-material/Instagram';
import { Facebook, Twitter, WhatsApp } from '@mui/icons-material';
import Image from 'next/image'

const Footer = () => {
    return (
        <div className='flex justify-evenly items-start bg-sky-700 text-slate-50 py-4 h-25'>
            <div className="footer-logo">
                <Image alt="Logo" src='/logo.png' width={241} height={202.24} className=' mix-blend-screen w-52 h-auto' />
            </div>
            <div className="footer-paginas">
                <h4 className='underline'>INFO UFPI</h4>
                <ul className='flex-column gap-3 mt-4'>
                    <li><a href="/">Home</a></li>
                    <li><a href="/nae/">NAE</a></li>
                    <li><a href="/sobre/">Sobre</a></li>
                    <li><a href="/contato/">Contato</a></li>
                </ul>
            </div>
            <div className="footer-projeto">
                <h4 className='underline'>PROJETO</h4>
                <ul className='flex-column gap-3 mt-4'>
                    <li><a href="#">Suporte</a></li>
                    <li><a href="#">Política de privacidade</a></li>
                    <li><a href="#">Termos de uso</a></li>
                </ul>
            </div>
        </div>
    )
}

export default Footer