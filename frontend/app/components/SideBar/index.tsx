'use client'
import React from 'react'
import axios from 'axios'
import './style.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faHeart, faCutlery, faCalendar, faBook, faBed, faBus, faHeadset, faUserAlt, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Image from 'next/image'
import { Inria_Serif } from 'next/font/google'

const inria_serif = Inria_Serif({ weight: "700", subsets: ['latin'], })

const SideBar = () => {
    const menu_options = [
        [<FontAwesomeIcon icon={faHouse} />, "Página Inicial", "/"],
        [<FontAwesomeIcon icon={faHeart} />, "Favoritos", "/favoritos"],
        [<FontAwesomeIcon icon={faCutlery} />, "Restaurante Universitario", "/restaurante-universitario"],
        [<FontAwesomeIcon icon={faCalendar} />, "Eventos", "/eventos"],
        [<FontAwesomeIcon icon={faBook} />, "Biblioteca", "/biblioteca"],
        [<FontAwesomeIcon icon={faBed} />, "Residência", "/residencia"],
        [<FontAwesomeIcon icon={faBus} />, "Ônibus", "/onibus"],
        [<FontAwesomeIcon icon={faHeadset} />, "Assistencia Estudantil", "/assistencia-estudantil"],
        [<FontAwesomeIcon icon={faUserAlt} />, "Conta", "/conta"]
    ];
    return (
        <div className={`sideBar flex-col justify-start ${inria_serif.className}`}>
            <ul>
                <li className='flex justify-end h-16' key='side_menu_closer'>
                    <div className='flex justify-end'>
                        <button onClick={() => {
                            const sideBar = document.querySelector('.sideBar');
                            const hamburguerMenu = document.querySelector('.hamburguerMenu');

                            if (sideBar) {
                                sideBar.classList.add('close');
                                sideBar.classList.remove('open');
                                setTimeout(() => {
                                    sideBar.classList.add('hidden');
                                }, 300);
                            };
                            if (hamburguerMenu) {
                                hamburguerMenu.classList.remove('hidden');
                                hamburguerMenu.classList.add('flex');
                            };
                        }} className='flex items-center justify-end w-100 h-100 p-6'>
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </button>
                    </div>
                </li>
                {
                    menu_options.map((option, index) => {
                        return (
                            <li key={"side_menu_option_" + index} className=' border-t flex gap-1 items-center h-14'>
                                <a href="#" className='py-3'>
                                    <i className='px-3 w-10'>
                                        {option[0]}
                                    </i>
                                    {option[1]}
                                </a>
                            </li>
                        )
                    })
                }
                <li className='flex gap-1 items-center border-t' key='side_menu_logo'>
                    <Image src="/logo.png" alt="Logo" width={241} height={202.24} className='w-100 h-100 mix-blend-difference' />
                </li>
            </ul>
        </div >
    )
}
export default SideBar;