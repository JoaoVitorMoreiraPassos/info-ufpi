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
import { Skeleton } from '@mui/material'
import NoticeCardPerfil from '../NoticeCardPerfil'


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
    const [next, setNext] = useState<string>('')
    const [loadingCardapio, setLoadingCardapio] = useState<boolean>(true)
    const [loadingNotices, setLoadingNotices] = useState<boolean>(true)

    useEffect(() => {
        const getCardapios = async () => {
            try {
                const response = await api.getCardapio();
                if (response.length === 0) return;
                const cardapios: Cardapio[] = response;
                console.log(cardapios)
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
                    almoco_alimentos.push(response);
                }

                for (let i in jantar[0].alimentos) {
                    const response: Alimento = await api.getAlimento(jantar[0]?.alimentos[i]);
                    if (!response) return;
                    if (response == null) return;
                    if (response == undefined) return;
                    jantar_alimentos.push(response);
                }
                setAlmoco(almoco_alimentos);
                setJantar(jantar_alimentos);
                setLoadingCardapio(false);
            } catch (error: any) {
                setLoadingCardapio(false);
                return;
            }
        }
        const getRecentNotices = async () => {
            let items: Notice[] = [];
            try {
                const response = await PostApi.ListPost();
                if (!response) return;
                if (response == null) return;
                if (response == undefined) return;
                const noticias: Notice[] = response.results
                setNext(response.next);
                for (let i = 0; i < noticias.length; i++) {
                    items.push(noticias[i]);
                }
                setLoadingNotices(false);
            } catch (error: any) {
                setLoadingNotices(false);
                return;
            }
            setRecentNotices(items);
        }
        const get_favorites = async () => {
            try {
                const response = await PostApi.ListFavoritePosts();
                if (!response) return;
                if (response == null) return;
                if (response == undefined) return;
                const favoritos: Favorito[] = response.results;
                setFavorites(favoritos);
            } catch (error: any) {
                if (error.toString() == "Error: Token not found") {
                    return;
                }
                else if (error.response.status === 401) {
                    return;
                }
            }
        }
        const run = async () => {
            await Promise.all([getCardapios(), getRecentNotices(), get_favorites()]);
        }
        run();
    }, [])


    return (
        <div className='flex-col p-6 max-[360px]:px-2 mt-8 '>

            {
                !loadingCardapio && almoco && jantar &&
                <div className="cardapios w-full flex justify-center ">
                    <div className='flex-col flex-wrap w-full'>
                        <div className='flex justify-center items-center w-full'>
                            <h1 className={' pb-4 text-xl flex justify-center w-full items-center text-center text-gray-600' + inter.className}>Cardápios de Hoje</h1>
                        </div>
                        <div className='flex flex-row gap-8 w-full justify-center text-white flex-wrap'>
                            <div className='cardapioContainer min-w-100 flex-col w-2/5 bg-blue-600 rounded-md py-6'>
                                <h1 className='text-xl justify-center w-full text-center '>Almoço</h1>
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
                            <div className='cardapioContainer flex-col w-2/5 bg-blue-600 rounded-md py-6'>
                                <h1 className='text-xl justify-center text-center'>Jantar</h1>
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
            {
                (almoco?.length ?? 0) === 0 && (jantar?.length ?? 0) === 0 && !loadingCardapio &&
                <div className='flex justify-center items-center w-full h-72'>
                    <p className='text-2xl text-gray-600'>Não há cardápio para hoje</p>
                </div>
            }
            {
                loadingCardapio &&
                <div className="w-full flex justify-center items-center">

                    <div className="flex justify-center flex-col items-center w-4/5">
                        <Skeleton variant="text" width={"25%"} height={50} />
                        <div className='flex justify-center items-center w-full h-72 gap-3 px-10'>
                            <Skeleton variant="rectangular" width={"45%"} height={250} style={
                                { borderRadius: "10px" }
                            } />
                            <Skeleton variant="rectangular" width={"45%"} height={250} style={
                                { borderRadius: "10px" }
                            } />
                        </div>
                    </div>
                </div>
            }
            <div className={'py-10 px-28 max-[700px]:px-2 max-[360px]:px-0 max-[360px]:w-full ' + inter.className}>
                <div>
                    <h1 className=' text-xl'>
                        Noticias e eventos recentes
                    </h1>
                </div>
                {
                    recentNotices.length === 0 && !loadingNotices &&
                    <p className=' text-sm'>Não há noticias recentes</p>
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
                            {
                                next &&
                                <button onClick={() => {
                                    PostApi.ListNextPost(next).then((response) => {
                                        if (!response) return;
                                        if (response == null) return;
                                        if (response == undefined) return;
                                        const noticias: Notice[] = response.results;
                                        setNext(response.next);
                                        let items: Notice[] = [];
                                        for (let i = 0; i < noticias.length; i++) {
                                            items.push(noticias[i]);
                                        }
                                        setRecentNotices([...recentNotices, ...items]);
                                    })
                                }} className='text-blue-500'>Carregar mais</button>
                            }
                        </ul>
                    </div>
                }
                {
                    loadingNotices &&
                    <div className='flex flex-col justify-start items-start w-full h-72 pt-4 gap-4'>
                        <Skeleton variant="rectangular" width={"100%"} height={75} style={
                            { borderRadius: "10px" }
                        } />
                        <Skeleton variant="rectangular" width={"100%"} height={75} style={
                            { borderRadius: "10px" }
                        } />
                        <Skeleton variant="rectangular" width={"100%"} height={75} style={
                            { borderRadius: "10px" }
                        } />
                        <Skeleton variant="rectangular" width={"100%"} height={75} style={
                            { borderRadius: "10px" }
                        } />
                    </div>
                }
            </div>
        </div>
    )
}

