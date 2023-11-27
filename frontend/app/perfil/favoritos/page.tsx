'use client'
import React from 'react'
import Header from '../../components/Header'
import SideBar from '../../components/SideBar'
import NoticeCardPerfil from '../../components/MainContent/NoticeCardPerfil'
import '@/app/globals.css'

const Perfil = () => {
    const infos = {
        "author": "Restaurante Universitário",
        "date": "Hoje às 12:00",
        "description": "O RU estará fechado hoje, 12/09, devido a um problema na cozinha.",
        "author_image": "/ru/ru perfil.png",
        "recipe_image": "/ru/image 1.png"

    }
    let favorites = [infos, infos, infos, infos]
    return (
        <div className="flex flex-row justify-start" >
            <SideBar />
            <main className='mainContainer border-l'>
                <Header />
                <div className='cardsContainer flex w-full flex-row flex-wrap p-14 justify-center items-start gap-10'>
                    {
                        favorites.map((favorite, index) => {
                            return (
                                <NoticeCardPerfil notice_infos={favorite} key={'favorite' + index} />
                            )
                        })
                    }
                </div>
            </main>
        </div>
    )
}

export default Perfil
