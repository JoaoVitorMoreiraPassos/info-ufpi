'use client';
import React from 'react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns-tz';
import 'moment/locale/pt-br';
import moment from 'moment';
import { time } from 'console';
import { useState, useEffect } from 'react';
import PostApi from '@/app/api/post';
import Link from 'next/link';

interface Noticia {
    id: number;
    titulo_post: string;
    autor_post: number;
    autor_post_nome: string;
    autor_imagem_post: string;
    conteudo_post: string;
    criacao: string;
    imagem_post: string;
    comentarios: [number];
};

const NoticeCardPerfil = ({ notice_infos }: { notice_infos: Noticia }) => {
    const cardStyle = {
        fontFamily: 'Inria Serif',
        backgroundColor: '#4985ADCC',
        minWidth: '300px',
        width: '500px',
        color: 'white',
    }
    const [timePassed, setTimePassed] = useState('');
    const [isFavorite, setIsFavorite] = useState<boolean>(true);
    const [text, setText] = useState<string>('text-yellow-500');

    useEffect(() => {
        if (isFavorite) {
            setText('text-yellow-500');
        } else {
            setText('text-gray-500');
        }
    }, [isFavorite])

    useEffect(() => {
        const brazilianTimeZone = 'America/Sao_Paulo';

        const calculateTimePassed = () => {
            if (!notice_infos.criacao) return;
            if (notice_infos.criacao === '') return;
            const brazilianTimeZone = 'America/Sao_Paulo';
            const currentDate = moment(format(new Date(), 'yyyy-MM-dd HH:mm:ss', {
                timeZone: brazilianTimeZone,
            }));
            const receivedDate = moment(notice_infos.criacao);

            const duration = moment.duration(currentDate.diff(receivedDate));
            const formattedTimePassed = duration.humanize();

            setTimePassed(formattedTimePassed);
        };

        calculateTimePassed();
    }, [notice_infos.criacao]);

    return (
        <div className=' card flex justify-center items-start py-2 gap-4 w-14' style={cardStyle}>
            <div className=' flex flex-row w-full gap-2 items-center justify-center px-4'>
                {
                    notice_infos.autor_imagem_post == null ?
                        <FontAwesomeIcon className="rounded-full w-3 h- p-3 z-10 bg-slate-300 text-white text-sm" icon={faUserAlt} />
                        :
                        <Image className='rounded-full flex justify-start w-14 h-14' width={1000} height={1000} src={notice_infos.autor_imagem_post} alt='profile' />
                }
                <div className=' w-full'>
                    <p className=' text-xl '>
                        {notice_infos.autor_post_nome}
                    </p>
                    <p className=' w-full'>
                        Postado há {timePassed}
                    </p>
                </div>
                <FontAwesomeIcon icon={faStar} className={
                    text + ' text-2xl mr-2 transition duration-500 ease-in-out cursor-pointer'
                } onClick={
                    async () => {
                        if (isFavorite) {
                            const response = await PostApi.DeleteFavoritePosts(notice_infos.id);
                            if (!response) return console.log('error');
                            if (response == null) return console.log('error');
                            if (response == undefined) return console.log('error');
                            setIsFavorite(false);
                        } else {
                            const response = await PostApi.CreateFavoritePosts(notice_infos.id);
                            if (!response) return console.log('error');
                            if (response == null) return console.log('error');
                            if (response == undefined) return console.log('error');
                            setIsFavorite(true);
                        }
                    }
                } />
            </div>
            <Link className=' w-full px-4' href={`/noticias/${notice_infos.id}`}>
                {
                    notice_infos.imagem_post == null ?
                        (
                            <div className=' h-64 w-full bg-gray-400 rounded-lg flex items-center justify-center' >
                                <p className=' text-2xl text-center text-white'>
                                    Sem imagem
                                </p>
                            </div>
                        ) : (
                            <Image className=' h-64 w-full bg-gray-400 rounded-lg ' width={1000} height={1000} src={notice_infos.imagem_post} alt='profile' />
                        )
                }
            </Link>
            <Link className=' description' href={`/noticias/${notice_infos.id}`}>
                <p className=' text-xl p-6 overflow-hidden'>
                    {notice_infos.conteudo_post.substring(0, 100) + '...'}
                </p>
            </Link>
        </div>
    )
}

export default NoticeCardPerfil
