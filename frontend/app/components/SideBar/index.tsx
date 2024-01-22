
'use client'
import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faHeart, faCutlery, faCalendar, faBook, faBed, faBus, faHeadset, faUserAlt, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Image from 'next/image'
import { Inria_Serif } from 'next/font/google'
import Link from 'next/link'
import { useState } from 'react';
import UserApi from '@/app/api/user';
import "@/app/globals.css"
import './style.css'


const inria_serif = Inria_Serif({ weight: "700", subsets: ['latin'], })
const SideBar = () => {

    const [user_to_search, setUserToSearch] = useState<string>('');
    const [isOnSearch, setIsOnSearch] = useState<boolean>(false);
    const [search_results, setSearchResults] = useState<any[]>([]);
    const menu_options = [
        {
            "id": 1,
            "icon": <FontAwesomeIcon icon={faHouse} />,
            "name": "Página Inicial",
            "link": "/"
        },
        {
            "id": 9,
            "icon": <FontAwesomeIcon icon={faUserAlt} />,
            "name": "Perfil",
            "link": "/perfil"
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

        <>
            <div className={`sideBar relative flex-col justify-start hidden ${inria_serif.className}`}>
                <ul>
                    <li className='flex justify-end h-16' key='side_menu_closer'>
                        <div className='flex justify-end'>
                            <button className='flex items-center justify-end w-100 h-100 p-6' onClick={openCloseSideBar}>
                                <FontAwesomeIcon icon={faArrowLeft} />
                            </button>
                        </div>
                    </li>
                    <li className='flex gap-1 justify-center items-center border-t' key='search_user'>
                        <input value={user_to_search} id={"search_users_id"} type="text" placeholder="Pesquisar usuário" className="border rounded-md h-12 w-100 pl-4 " onFocus={
                            (e) => {
                                setIsOnSearch(true);
                            }
                        } onChange={
                            (e) => {

                                setUserToSearch(e.target.value)
                                if (e.target.value == '') {
                                    setSearchResults([]);
                                } else {
                                    const getSearchResults = async () => {
                                        try {
                                            const response = await UserApi.SearchUsers(e.target.value);
                                            setSearchResults(response.results);
                                        } catch (error) {
                                            console
                                        }
                                    }
                                    getSearchResults();
                                }
                            }
                        }
                            onBlur={() =>
                                setTimeout(() => {
                                    setIsOnSearch(false);
                                }, 500)}
                        />

                    </li>


                    {
                        !isOnSearch &&
                        menu_options.map((option, index) => {
                            return (
                                <li key={"side_menu_option_" + option.id} className=' border-t flex gap-1 items-center h-14'>
                                    <Link href={option.link} className='py-3'>
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
                    {
                        isOnSearch &&
                        search_results.map((result, index) => {
                            return (
                                <li key={"side_menu_option_" + result.id} className=' border-t flex gap-1 items-center h-14 transition-all duration-500 ease-in-out hover:bg-gray-100'>
                                    <Link href={`/perfil/${result.username}`} className='py-3 flex items-center w-full h-full'>
                                        {result.foto_perfil == null ?
                                            <i className='px-3 w-10'>
                                                <FontAwesomeIcon icon={faUserAlt} />
                                            </i>
                                            :
                                            <Image src={result.foto_perfil} alt={result.username} width={20} height={20} className='mx-2 w-auto h-full rounded-full aspect-square' />
                                        }
                                        <span className='w-100'>
                                            {result.username}
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
        </>
    )
}
export default SideBar;