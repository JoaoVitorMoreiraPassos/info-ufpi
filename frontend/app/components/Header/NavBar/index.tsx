'use client'
import React, { useEffect, useState } from 'react'
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faHamburger } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'


const NavBar = ({ page_index: page_index }: { page_index: undefined | Number }) => {
    const menu_options = [
        ["Página Inicial", "/", "home" + (page_index == 0 ? " navHighlighted " : "")],
        ["Sobre", "/sobre", "about" + (page_index == 1 ? " navHighlighted " : "")],
        ["Contato", "/contato", "contact" + (page_index == 2 ? " navHighlighted " : "")],
    ];

    const [screenWidth, setScreenWidth] = useState<number>(0);
    const [screenHeight, setScreenHeight] = useState<number>(0);

    React.useEffect(() => {
        setScreenWidth(window.innerWidth);
        setScreenHeight(window.innerHeight);
    }, []);

    React.useEffect(() => {
        window.addEventListener("resize", () => {
            setScreenWidth(window.innerWidth);
            setScreenHeight(window.innerHeight);
        });
    }, []);


    return (

        <>

            {
                screenWidth >= 1024 ? (

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
                        {
                            menu_options.map((option, index) => {
                                const class_name = 'opacity-70 px-6 py-3 hover:opacity-100 transition duration-300 ease-in-out ' + option[2];
                                return (
                                    <div key={"nav_menu_option_" + index} className='flex gap-1 items-center'>
                                        <Link href={option[1]} className={"navPageOption " + class_name}>
                                            {option[0]}
                                        </Link>
                                    </div>
                                )
                            })
                        }
                    </div>
                ) :
                    (
                        <div className='flex navPages  justify-center items-center mx-6 overflow-hidden'>
                            <div className='hamburguerMenu flex justify-center items-center absolute'>
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
                        </div>
                    )
            }
        </>
    )
}

export default NavBar