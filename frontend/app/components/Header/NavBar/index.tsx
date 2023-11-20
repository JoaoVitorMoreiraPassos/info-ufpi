'use client'
import React, { useEffect, useState } from 'react'
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faHamburger } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'


const NavBar = () => {
    const menu_options = [
        ["Página Inicial", "/", "home"],
        ["Sobre", "/sobre", "about"],
        ["Contato", "/contato", "contact"],
    ];
    return (
        <div className='flex navPages items-center mx-6 overflow-hidden'>
            <div className='hamburguerMenu hidden'>
                <button onClick={() => {
                    const sideBar = document.querySelector('.sideBar');
                    const hamburguerMenu = document.querySelector('.hamburguerMenu');
                    if (sideBar) {
                        sideBar.classList.remove('close');
                        sideBar.classList.add('open');
                        sideBar.classList.remove('hidden');
                    };
                    setTimeout(() => {
                        if (hamburguerMenu) {
                            hamburguerMenu.classList.add('hidden');
                            hamburguerMenu.classList.remove('flex');
                        };
                    }, 300);
                }}>
                    <i><FontAwesomeIcon icon={faBars} /></i>
                </button>
            </div>
            {menu_options.map((option, index) => {
                const class_name = 'opacity-70 px-6 py-3 hover:opacity-100 transition duration-300 ease-in-out ' + option[2];
                return (
                    <div key={"nav_menu_option_" + index} className='flex gap-1 items-center'>
                        <a href={option[1]} className={class_name}>
                            {option[0]}
                        </a>
                    </div>
                )
            }
            )}
        </div>
    )
}

export default NavBar