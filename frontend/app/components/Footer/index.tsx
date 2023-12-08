import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fontsource/roboto/300.css'
import React from 'react'
import Instagram from '@mui/icons-material/Instagram';
import { Facebook, Twitter, WhatsApp } from '@mui/icons-material';
import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
    return (
        <div className='flex justify-evenly items-start bg-sky-700 text-slate-50 py-4 h-25'>
            <div className="footer-logo">
                <Image alt="Logo" src='/logo.png' width={241} height={202.24} className=' mix-blend-screen w-52 h-auto' />
            </div>
            <div className="footer-paginas">
                <h4 className='underline'>INFO UFPI</h4>
                <ul className='flex-column gap-3 mt-4'>
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/nae/">NAE</Link></li>
                    <li><Link href="/sobre/">Sobre</Link></li>
                    <li><Link href="/contato/">Contato</Link></li>
                </ul>
            </div>
            <div className="footer-projeto">
                <h4 className='underline'>PROJETO</h4>
                <ul className='flex-column gap-3 mt-4'>
                    <li><Link href="#">Suporte</Link></li>
                    <li><Link href="#">Política de privacidade</Link></li>
                    <li><Link href="#">Termos de uso</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default Footer