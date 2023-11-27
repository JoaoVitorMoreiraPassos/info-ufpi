'use client'
import React from 'react'
import Header from '../components/Header'
import SideBar from '../components/SideBar'
import NoticeCardPerfil from '../components/MainContent/NoticeCardPerfil'


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
    let noticias = [favoritos, favoritos, favoritos, favoritos]
    return (
        <main className="flex flex-row justify-start" >
            <SideBar />
            <div className='mainContainer border-l'>
                <Header />
                <div className="perfilBanner flex flex-col justify-center items-start w-full h-auto p-20 relative">
                    <img className="absolute top-0 left-0 w-full h-full object-cover z-0" src={profile.background_image} alt="background" />
                    <div className="flex flex-col justify-center items-start w-full h-1/4 z-50">
                        <img className="rounded-full w-60 h-60 z-10" src={profile.image} alt="profile" />
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
            </div>
        </main>
    )
}

export default Perfil
