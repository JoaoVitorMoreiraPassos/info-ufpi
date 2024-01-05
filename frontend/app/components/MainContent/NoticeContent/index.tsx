'use client';
import React from 'react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { format } from 'date-fns-tz';
import 'moment/locale/pt-br';
import moment from 'moment';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

interface Noticia {
    titulo: string;
    descricao: string;
    image: string;
    data: string;
    autor: string;
    categoria: string;
    autor_image: string;
}

const NoticeContent = ({ slug }: { slug: string }) => {

    const noticia = async () => {
        const response: Noticia = await fetch('http://localhost:3333/noticias/' + slug).then(response => response.json())
        return response;
    }
    noticia.data = "2023-12-17 17:30:00";

    const [timePassed, setTimePassed] = useState('');

    useEffect(() => {
        const brazilianTimeZone = 'America/Sao_Paulo';

        const calculateTimePassed = () => {
            const currentDate = moment(format(new Date(), 'yyyy-MM-dd HH:mm:ss', {
                timeZone: brazilianTimeZone,
            }));
            const receivedDate = moment(noticia.data);

            const duration = moment.duration(currentDate.diff(receivedDate));
            const formattedTimePassed = duration.humanize();

            setTimePassed(formattedTimePassed);
        };

        calculateTimePassed();
    }, [noticia.data]);
    noticia.image = "/image 1.png";
    noticia.autor_image = "/ru/ru perfil.png";
    noticia.autor = "Restaurante Universitário";

    return (
        <div className=' mainContainer flex flex-col justify-start items-center gap-4 p-4 pt-10 max-sm:p-0'>

            <div className=' flex flex-row justify-start items-center gap-2 p-2 w-3/4 max-sm:w-full max-sm:p-1'>
                <Image src='/ru/ru perfil.png' className="rounded-full w-10 h-10 z-10 " width={40} height={40} alt="profile" />
                <div className='flex-col flex '>
                    <p className='text-xl font-bold'>
                        {noticia.autor}
                    </p>
                    <p>
                        Postado há {
                            timePassed
                        }
                    </p>
                </div>
            </div>
            <div className='flex flex-col justify-start items-center  w-3/4 max-sm:w-full max-sm:p-0'>
                <Image src={noticia.image} width={1000} height={1000} alt={noticia.autor} className='rounded-lg w-auto h-auto' />
            </div>
            <div className='flex flex-col justify-start items-start gap-4 p-2 w-3/4 max-sm:w-full max-sm:p-2'>
                <p className='text-x font-bold text-justify text-black'>
                    O Curso de Sistemas de Informação, da Universidade Federal do Piauí, Campus Senador Helvídio Nunes de Barros, recebeu na terça-feira, dia 31 de outubro, a visita de alunos do oitavo, nono e primeiro ano dos ensinos: fundamental e médio, respectivamente, da Escola Estadual Terezinha Nunes. A visita teve como objetivo apresentar aos alunos o curso de Sistemas de Informação, bem como o mercado de trabalho e as áreas de atuação do profissional formado em Sistemas de Informação.
                </p>
            </div>

            <div className="flex flex-col justify-start items-start w-3/4 mt-6 mb-12 max-sm:w-full max-sm:p-1 gap-2">
                <p className='text-2xl font-bold w-'>
                    Comentários
                </p>
                <div className='commentContainer flex flex-row justify-start items-center gap-2 p-2 w-full'>
                    <Image src='/ru/ru perfil.png' className="rounded-full w-16 h-16 z-10" width={60} height={60} alt="profile" />
                    <div className='flex-col flex w-full justify-end'>
                        <p className='font-bold'>
                            {noticia.autor}
                        </p>
                        <div className='relative w-full h-auto flex flex-row'>
                            <input type="text" name="comment" id="comment" placeholder='Adicione um comentário' className='p-0' />
                            <button className='text-blue-500 w-10 h-10'><FontAwesomeIcon icon={faPaperPlane} /></button>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='commentContainer flex flex-row justify-start items-center gap-2 p-2 w-full'>
                        <Image src='/ru/ru perfil.png' className="rounded-full w-16 h-16 z-10" width={60} height={60} alt="profile" />
                        <div className='flex-col flex w-full justify-end'>
                            <p className='font-bold'>
                                {noticia.autor}
                            </p>
                            <p className='text-justify'>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoticeContent
