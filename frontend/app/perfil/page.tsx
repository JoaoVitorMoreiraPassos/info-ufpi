'use client';
import React from 'react';
import NoticeCardPerfil from '../components/MainContent/NoticeCardPerfil';
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import './style.css'


const Perfil = () => {

    const profile = {
        "name": "Restaurante Universitário",
        "bio": "O Restaurante Universitário (RU) é um órgão suplementar da Universidade Federal do Ceará, vinculado à Pró-Reitoria de Assuntos Estudantis (PRAE).",
        "image": "/ru/ru perfil(1).png",
        "background_image": "/ru/capa.png"
    }

    const favoritos = {
        "author": "Restaurante Universitário",
        "date": "Hoje às 12:00",
        "description": "O RU estará fechado hoje, 12/09, devido a um problema na cozinha.",
        "author_image": "/ru/ru perfil.png",
        "recipe_image": "/ru/image 1.png"
    }
    let noticias = [favoritos, favoritos]

    const [screenWidth, setScreenWidth] = useState<number>(0);
    React.useEffect(() => {
        setScreenWidth(window.innerWidth);
        window.addEventListener("resize", () => {
            setScreenWidth(window.innerWidth);
        });
    }, []);

    let mainClasses = "mainContainer ";

    return (
        <div>
            <div className="flex flex-row justify-start items-start" >
                <SideBar />
                <div className={mainClasses}>
                    <Header page_index={-1} />
                    <main>
                        <div className="perfilBanner fklex flex-col justify-center items-start w-full h-auto p-20 relative">
                            <Image className="absolute top-0 left-0 w-full h-full object-cover z-0" width={1920} height={554} src={profile.background_image} alt="background" />
                            <div className={" bannerContent flex flex-col justify-center w-full h-1/4 z-50 items-start" + (screenWidth <= 1024 ? " items-center" : " items-start")}>
                                <Image className="rounded-full w-60 h-60 z-10" width={1000} height={1000} src={profile.image} alt="profile" />
                                <div className='w-full bg-slate-400 absolute bottom-0 left-0 h-28 opacity-50'>
                                </div>
                                <p className="text-3xl text-left text-white bottom-8 absolute opacity-100">{profile.name}</p>
                            </div>
                        </div>
                        <div className='cardsContainer flex w-full flex-row flex-wrap p-14 justify-center items-start gap-10'>
                            {
                                noticias.map((notice, index) => {
                                    return (
                                        <NoticeCardPerfil notice_infos={notice} key={'notice' + index} />
                                    )
                                })
                            }
                        </div>
                    </main>
                </div>
            </div>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}

export default Perfil
