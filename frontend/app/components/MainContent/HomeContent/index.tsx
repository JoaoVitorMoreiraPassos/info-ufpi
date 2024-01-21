'use client'
import React, { use } from 'react'
import { useState, useEffect } from 'react'
import NoticeCard from '../NoticeCardHome'
import RecentNotice from './RecentNotice'
import { Inter } from 'next/font/google'
import './style.css'
import PostApi from '@/app/api/post'
import api from '@/app/api/ru'
import { format } from 'date-fns-tz'
import { AirplanemodeActive } from '@mui/icons-material'
import './style.css'



const inter = Inter({ subsets: ['latin'] })

interface Alimento {
    filter(arg0: (alimento: any) => boolean): unknown
    id: number;
    tipo_refeicao: string;
    nome_refeicao: string;
}

interface Cardapio {
    id: number;
    tipo: string;
    data: string;
    alimentos: number[];
}
interface Notice {
    id: number,
    titulo_post: string,
    autor_post: number,
    conteudo_post: string,
    imagem_post: string,
    criacao: string,
    ativo: true,
    comentarios: [],
}
interface Favorito {
    id: number;
    post_favorito: number;
    autor_favorito: number;
}
interface Favoritos {
    count: number;
    next: string;
    previous: string;
    results: Favorito[];
}

export default function HomeContent() {
    const [recentNotices, setRecentNotices] = useState<Notice[]>([])
    const [favorites, setFavorites] = useState<Favorito[]>([])
    const [almoco, setAlmoco] = useState<Alimento[]>()
    const [jantar, setJantar] = useState<Alimento[]>()

    useEffect(() => {
        const getCardapios = async () => {
            const response = await api.getCardapio();
            if (!response) return console.log('error');
            if (response == null) return console.log('error');
            if (response == undefined) return console.log('error');
            if (response.results.length === 0) return console.log('error');
            const cardapios: Cardapio[] = response.results;
            // get today date in brazilian timezone
            const brazilianTimeZone = 'America/Sao_Paulo';

            const currentDateTimeInBrazil = format(new Date(), 'yyyy-MM-dd', {
                timeZone: brazilianTimeZone,
            });

            let almoco = cardapios.filter((cardapio) => {
                if (cardapio.tipo === 'A' && cardapio.data === currentDateTimeInBrazil) {
                    return cardapio.alimentos;
                }
            });
            let jantar = cardapios.filter((cardapio) => {
                if (cardapio.tipo === 'J' && cardapio.data === currentDateTimeInBrazil) {
                    return cardapio.alimentos;
                }
            });
            let almoco_alimentos: Alimento[] = [];
            let jantar_alimentos: Alimento[] = [];
            for (let i in almoco[0].alimentos) {
                const response = await api.getAlimento(almoco[0]?.alimentos[i]);
                if (!response) return console.log('error');
                if (response == null) return console.log('error');
                if (response == undefined) return console.log('error');
                almoco_alimentos.push(response);
            }

            for (let i in jantar[0].alimentos) {
                const response: Alimento = await api.getAlimento(jantar[0]?.alimentos[i]);
                if (!response) return console.log('error');
                if (response == null) return console.log('error');
                if (response == undefined) return console.log('error');
                jantar_alimentos.push(response);
            }
            console.log(almoco_alimentos)
            setAlmoco(almoco_alimentos);
            setJantar(jantar_alimentos);
        }
        const getRecentNotices = async () => {
            let items: Notice[] = [];
            let url = `http://localhost:8000/api/v1/posts/`;
            while (true) {
                const response = await fetch(url);
                const data = await response.json();
                items = items.concat(data.results);
                url = '';
                url = data.next;
                if (data.next === null) {
                    break;
                }
            }
            setRecentNotices(items);
        }
        const get_favorites = async () => {
            const response = await PostApi.ListFavoritePosts();
            if (!response) return console.log('error');
            if (response == null) return console.log('error');
            if (response == undefined) return console.log('error');
            const favoritos: Favorito[] = response.results;
            setFavorites(favoritos);
        }
        const run = async () => {
            await Promise.all([getCardapios(), getRecentNotices(), get_favorites()]);
        }
        run();
    }, [])

    // const em_alta = [
    //     { "id": 1, "title": "Restaurante", "image": "/ru imagem.png", },
    //     { "id": 2, "title": "Biblioteca", "image": "/livros.png", },
    //     { "id": 3, "title": "Núcleo de assistencia estudantil", "image": "/nae.png", },
    // ]
    return (
        <div className='flex-col p-6 mt-8 '>
            {/* <div className='flex-col'>
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
            </div> */}
            {
                (almoco?.length ?? 0) > 0 && (jantar?.length ?? 0) > 0 &&
                <div className="cardapios w-full flex justify-center ">
                    <div className='flex-col flex-wrap w-full'>
                        <div className='flex justify-center items-center w-full'>
                            <h1 className={' pb-4 text-xl flex justify-center w-full items-center text-center text-gray-600' + inter.className}>Cardápios de Hoje</h1>
                        </div>
                        <div className='flex flex-row gap-8 w-full justify-center text-white flex-wrap'>
                            <div className='cardapioContainer min-w-100 flex-col w-2/5 bg-blue-300 rounded-md py-6'>
                                <h1 className='text-xl justify-center w-full text-center underline'>Almoço</h1>
                                <div className=' min-w-100 flex flex-col gap-4 w-full justify-center px-2 '>
                                    <div className='flex flex-row justify-center px-1 border-white border rounded-xl '>
                                        <div className=' w-1/2 border-r-white border-r flex flex-col items-center'>
                                            <p className='underline '>Normal</p>
                                            {
                                                almoco?.filter((alimento) => alimento.tipo_refeicao === 'N').map((alimento, index) => {
                                                    return (
                                                        <p key={'alimento_' + index} className='text-center'>{alimento.nome_refeicao}</p>
                                                    )
                                                })}
                                        </div>
                                        <div className='min-w-100 w-1/2 flex flex-col items-center'>
                                            <p className='underline '>Vegetariano</p>
                                            {
                                                almoco?.filter((alimento) => alimento.tipo_refeicao === 'V').map((alimento, index) => {
                                                    return (
                                                        <p key={'alimento_' + index} className='text-center'>{alimento.nome_refeicao}</p>
                                                    )
                                                })}

                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-1 justify-start items-center px-6'>
                                        <p className='underline '>Acompanhamentos</p>
                                        {
                                            almoco?.filter((alimento) => alimento.tipo_refeicao === 'A').map((alimento, index) => {
                                                return (
                                                    <p key={'alimento_' + index} className='text-center'>{alimento.nome_refeicao}</p>
                                                )
                                            })}
                                    </div>
                                </div>
                            </div>
                            <div className='cardapioContainer flex-col w-2/5 bg-blue-300 rounded-md py-6'>
                                <h1 className='text-xl justify-center text-center underline'>Jantar</h1>
                                <div className='flex flex-col gap-4 justify-center px-2'>
                                    <div className='flex flex-row justify-center px-1 border-white border rounded-xl flex-wrap'>
                                        <div className='normal min-w-100 w-1/2 border-r-white border-r flex flex-col items-center'>
                                            <p className='underline '>Normal</p>
                                            {
                                                jantar?.filter((alimento) => alimento.tipo_refeicao === 'N').map((alimento, index) => {
                                                    return (
                                                        <p key={'alimento_' + index} className='text-center'>{alimento.nome_refeicao}</p>
                                                    )
                                                })}
                                        </div>
                                        <div className='vegetariano min-w-100 w-1/2 flex flex-col items-center px-2'>
                                            <p className='underline '>Vegetariano</p>
                                            {
                                                jantar?.filter((alimento) => alimento.tipo_refeicao === 'V').map((alimento, index) => {
                                                    return (
                                                        <p key={'alimento_' + index} className='text-center'>{alimento.nome_refeicao}</p>
                                                    )
                                                })}

                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-1 justify-start items-center px-6'>
                                        <p className='underline '>Acompanhamentos</p>
                                        {
                                            jantar?.filter((alimento) => alimento.tipo_refeicao === 'A').map((alimento, index) => {
                                                return (
                                                    <p key={'alimento_' + index} className='text-center'>{alimento.nome_refeicao}</p>
                                                )
                                            })}
                                    </div>
                                </div>
                            </div>
                            {
                                !almoco && <p className='text-lg'>Não há cardápio para o almoço</p>
                            }
                            {
                                !jantar && <p className='text-lg'>Não há cardápio para o jantar</p>
                            }

                        </div>
                    </div>
                </div>
            }
            <div className={'py-10 ' + inter.className}>
                <div>
                    <h1 className=' text-xl'>
                        Noticias e eventos recentes
                    </h1>
                </div>
                {
                    recentNotices.length === 0 && <p className=' text-xl'>Não há noticias recentes</p>
                }
                {
                    recentNotices.length > 0 &&
                    <div className='flex-col h-auto'>
                        <ul>
                            {
                                recentNotices.length > 0 && recentNotices.map((notice, index) => {
                                    return (
                                        <li key={"recent_card_" + index}>
                                            <RecentNotice notice={notice} favorito={
                                                favorites.find((favorito) => { return favorito.post_favorito === notice.id })
                                            } key={"recent_card_" + index} />
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                }
            </div>
        </div>
    )
}

