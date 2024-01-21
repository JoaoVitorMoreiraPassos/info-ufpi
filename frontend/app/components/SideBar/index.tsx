'use client'
import React from 'react'
import './style.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faHeart, faCutlery, faCalendar, faBook, faBed, faBus, faHeadset, faUserAlt, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Image from 'next/image'
import { Inria_Serif } from 'next/font/google'
import Link from 'next/link'
import { useState } from 'react';

const inria_serif = Inria_Serif({ weight: "700", subsets: ['latin'], })
const SideBar = () => {
    const menu_options = [
        {
            "id": 1,
            "icon": <FontAwesomeIcon icon={faHouse} />,
            "name": "Página Inicial",
            "link": "/"
        },
        {
            "id": 2,
            "icon": <FontAwesomeIcon icon={faHeart} />,
            "name": "Favoritos",
            "link": "/favoritos"
        },
        {
            "id": 3,
            "icon": <FontAwesomeIcon icon={faCutlery} />,
            "name": "Restaurante Universitario",
            "link": "/restaurante-universitario"
        },
        {
            "id": 4,
            "icon": <FontAwesomeIcon icon={faCalendar} />,
            "name": "Eventos",
            "link": "/eventos"
        },
        {
            "id": 5,
            "icon": <FontAwesomeIcon icon={faBook} />,
            "name": "Biblioteca",
            "link": "/biblioteca"
        },
        {
            "id": 6,
            "icon": <FontAwesomeIcon icon={faBed} />,
            "name": "Residência",
            "link": "/residencia"
        },
        {
            "id": 7,
            "icon": <FontAwesomeIcon icon={faBus} />,
            "name": "Ônibus",
            "link": "/onibus"
        },
        {
            "id": 8,
            "icon": <FontAwesomeIcon icon={faHeadset} />,
            "name": "Assistencia Estudantil",
            "link": "/assistencia-estudantil"
        },
        {
            "id": 9,
            "icon": <FontAwesomeIcon icon={faUserAlt} />,
            "name": "Conta",
            "link": "/conta"
        },
    ];

    const openCloseSideBar = () => {
        const sideBar = document.querySelector('.sideBar');
        const hamburguerMenu = document.querySelector('.hamburguerMenu');

        if (sideBar) {
            sideBar.classList.add('close');
            sideBar.classList.remove('open');
        };
        if (hamburguerMenu) {
            hamburguerMenu.classList.remove('hidden');
            hamburguerMenu.classList.add('flex');
            document.querySelector('.mainContainer')?.classList.remove('border-l');
        };
    }


    return (

        <div>
            <div className={`sideBar relative flex-col justify-start hidden ${inria_serif.className}`}>
                <ul>
                    <li className='flex justify-end h-16' key='side_menu_closer'>
                        <div className='flex justify-end'>
                            <button className='flex items-center justify-end w-100 h-100 p-6' onClick={openCloseSideBar}>
                                <FontAwesomeIcon icon={faArrowLeft} />
                            </button>
                        </div>
                    </li>
                    {
                        menu_options.map((option, index) => {
                            return (
                                <li key={"side_menu_option_" + option.id} className=' border-t flex gap-1 items-center h-14'>
                                    <Link href="#" className='py-3'>
                                        <i className='px-3 w-10'>
                                            {option.icon}
                                        </i>
                                        <span className='w-100'>
                                            {option.name}
                                        </span>
                                    </Link>
                                </li>
                            )
                        })
                    }
                    <li className='flex gap-1 items-center border-t' key='side_menu_logo'>
                        <Image src="/logo.png" alt="Logo" width={241} height={202.24} className='w-100 h-100 mix-blend-difference' />
                    </li>
                </ul>
            </div >
            {/* {
                screenWidth > 1024 ? (
                )
                    : (
                        <div className={`sideBar relative flex-col justify-start ${inria_serif.className} hidden bg-white`}>
                            <ul>
                                <li className='flex justify-end h-16' key='side_menu_closer'>
                                    <div className='flex justify-end'>
                                        <button className='flex items-center justify-end w-100 h-100 p-6' onClick={openCloseSideBar}>
                                            <FontAwesomeIcon icon={faArrowLeft} />
                                        </button>
                                    </div>
                                </li>
                                {
                                    menu_options.map((option, index) => {
                                        return (
                                            <li key={"side_menu_option_" + option.id} className=' border-t flex gap-1 items-center justify-center h-14'>
                                                <Link href="#" className='py-3 flex justify-center'>
                                                    <i className='px-3 w-10'>
                                                        {option.icon}
                                                    </i>
                                                    <span className='w-100'>
                                                        {option.name}
                                                    </span>
                                                </Link>
                                            </li>
                                        )
                                    })
                                }
                                <li className='flex gap-1 justify-center items-center border-t' key='side_menu_logo'>
                                    <Image src="/logo.png" alt="Logo" width={241} height={202.24} className='w-60 h-50 mix-blend-difference' />
                                </li>
                            </ul>
                        </div >
                    )
            } */}
        </div>
    )
}
export default SideBar;