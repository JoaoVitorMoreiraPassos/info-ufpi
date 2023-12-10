import React from 'react'
import NoticeCard from '../NoticeCardHome'
import RecentNotice from './RecentNotice'
import { Inter } from 'next/font/google'
import './style.css'

const inter = Inter({ subsets: ['latin'] })

export default function HomeContent() {
    const em_alta = [
        { "id": 1, "title": "Restaurante", "image": "/ru imagem.png", },
        { "id": 2, "title": "Biblioteca", "image": "/livros.png", },
        { "id": 3, "title": "Núcleo de assistencia estudantil", "image": "/nae.png", },
    ]
    const recent_notices = [
        "Novo formato para a recepção de calouros e acolhimento aos alunos no Campus",
        "Vagas para estudantes monitores em vários cursos",
        "Novos horários e itinerário do ônibus circular para o semestre 2023.2",
        "O restaurante universitário não funcionará no feriado!",
    ]
    return (
        <div className='flex-column p-6 mt-8 '>
            <div className='flex-column'>
                <div>
                    <h1 className={' pb-4 text-xl ' + inter.className}>Em alta</h1>
                </div>
                <div className='flex gap-8 carousel'>
                    <ul className='flex gap-8 carousel' >
                        {
                            em_alta.length > 0 && em_alta.map((noticia, index) => {
                                return (
                                    <li key={"fire_card" + index}>
                                        <NoticeCard noticia={noticia} key={"fire_card" + index} />
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>

            <div className={'py-10 ' + inter.className}>
                <div>
                    <h1 className=' text-xl'>
                        Noticias e eventos recentes
                    </h1>
                </div>
                <div className='flex-column h-auto'>
                    <ul>
                        {
                            recent_notices.length > 0 && recent_notices.map((notice, index) => {
                                return (
                                    <li key={"recent_card_" + index}>
                                        <RecentNotice description={notice} key={"recent_card_" + index} />
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

