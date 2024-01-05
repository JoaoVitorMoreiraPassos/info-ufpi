import React from 'react'
import NoticeCardPerfil from '../../components/MainContent/NoticeCardPerfil'
import SideBar from '../../components/SideBar'
import Header from '../../components/Header'
import Footer from '@/app/components/Footer'
import { metadata } from '@/app/layout'
import '@/app/globals.css'

const Perfil = () => {
    metadata.title = 'Favoritos';
    const infos = {
        "author": "Restaurante Universitário",
        "date": "Hoje às 12:00",
        "description": "O RU estará fechado hoje, 12/09, devido a um problema na cozinha.",
        "author_image": "/ru/ru perfil.png",
        "recipe_image": "/ru/image 1.png"

    }
    const favorites = [infos, infos, infos, infos]
    return (
        <div>
            <div className="flex flex-row justify-start" >
                <SideBar />
                <div className='mainContainer'>
                    <Header page_index={-1} />
                    <main className='cardsContainer flex w-full flex-row flex-wrap p-14 justify-center items-start gap-10'>
                        <p className='text-3xl text-left text-black font-bold w-full'>
                            Favoritos
                        </p>
                        {
                            favorites.map((favorite, index) => {
                                return (
                                    <NoticeCardPerfil notice_infos={favorite} key={'favorite' + index} />
                                )
                            })
                        }
                    </main>
                </div>
            </div>
            <footer>
                <Footer />
            </footer>
        </div >
    )
}

export default Perfil
