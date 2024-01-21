'use client';
import React, { use } from 'react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { format } from 'date-fns-tz';
import 'moment/locale/pt-br';
import moment from 'moment';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faUser, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import UserApi from '@/app/api/user';
import PostApi from '@/app/api/post';



interface Profile {
    id: number,
    first_name: string,
    last_name: string,
    username: string,
    email: string,
    foto_perfil: string,
    post_permissoes: boolean,
}

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
}

interface Comentario {
    id: number;
    post_comentario: number;
    autor_comentario: number;
    autor_comentario_nome: string;
    imagem_autor_comentario: string;
    conteudo_comentario: string;
    criacao: string;
}

const NoticeContent = ({ slug }: { slug: string }) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [data, setData] = useState('');
    const [autor, setAutor] = useState('');
    const [autor_image, setAutor_image] = useState('');
    const [timePassed, setTimePassed] = useState('');
    const [commentIds, setCommentsIds] = useState<Array<number>>([]);
    const [comments, setComments] = useState<Array<Comentario>>([]);
    const [comment, setComment] = useState('');
    const [user, setUser] = useState<string>();
    const [user_image, setUserImage] = useState<string>("");

    useEffect(() => {
        const getNoticia = async () => {
            try {
                if (!slug) return;
                const response: Noticia = await PostApi.GetPost(parseInt(slug[0]));
                if (!response) {
                    console.log("Notícia não encontrada");
                    return;
                }
                setTitle(response.titulo_post);
                setDescription(response.conteudo_post);
                setImage(response?.imagem_post);
                setData(response.criacao);
                setAutor(response.autor_post_nome);
                setAutor_image(response?.autor_imagem_post);
                setCommentsIds(response.comentarios);
            }
            catch (error: any) {
                console.log(error)
            }
        }
        const getLoggedUser = async () => {
            if (!localStorage.getItem('access')) return;
            if (!localStorage.getItem('refresh')) return;
            try {
                const response: Profile | undefined = await UserApi.GetLoggedUser();
                if (!response) return;
                setUser(response.username);
                setUserImage(response.foto_perfil);
            }
            catch (error: any) {
                if (error.response.status === 401) {
                    alert('Sua sessão expirou, faça login novamente');
                    return;
                }
            }
        }
        getNoticia()
        getLoggedUser();
    }, [slug]);

    useEffect(() => {
        const getComments = async () => {
            try {
                if (!slug) return;
                const id = parseInt(slug[0]);
                const response = await PostApi.ListComments(id);
                setComments(response)
                console.log(comments)
            }
            catch (error) {
                console.log(error);
            }
        }
        getComments()
    }, [commentIds, slug, comments]);
    useEffect(() => {
        document.title = title;
    }, [title, comments]);

    useEffect(() => {
        const brazilianTimeZone = 'America/Sao_Paulo';

        const calculateTimePassed = () => {
            if (!data) return;
            if (data === '') return;
            const currentDate = moment(format(new Date(), 'yyyy-MM-dd HH:mm:ss', {
                timeZone: brazilianTimeZone,
            }));
            const receivedDate = moment(data);

            const duration = moment.duration(currentDate.diff(receivedDate));
            const formattedTimePassed = duration.humanize();

            setTimePassed(formattedTimePassed);
        };

        calculateTimePassed();
    }, [data]);

    const handleComment = async () => {
        try {
            const user = await UserApi.GetLoggedUser();
            if (!user) {
                document.location.href = '/autenticao/login';
                return;
            }
            const post_id = parseInt(slug[0]);
            const response: Comentario = await PostApi.CreateComment(post_id, comment, user.id);
            // Criar elemento de comentário
            setComment('');

            const newComment = {
                id: response.id,
                post_comentario: response.post_comentario,
                autor_comentario: response.id,
                autor_comentario_nome: response.autor_comentario_nome,
                imagem_autor_comentario: response.imagem_autor_comentario,
                conteudo_comentario: comment,
                criacao: response.criacao,
            };
            console.log(newComment)
            setComments((comments) => [...comments, newComment]);
        }
        catch (error: any) {
            console.log(error);
            if (error.response.status === 401) {
                alert('Você precisa estar logado para comentar');
                return;
            }
        }
    }

    return (
        <div className=' mainContainer flex flex-col justify-start items-center gap-4 p-4 pt-10 max-sm:p-0'>
            <div className=' flex flex-row justify-start items-center gap-2 p-2 w-1/2 max-sm:w-full max-sm:p-1'>
                {
                    !autor_image ? (
                        <FontAwesomeIcon icon={faUserAlt} className="rounded-full w-4 h-4 p-2 z-10 shadow-sm border-2" width={40} height={40} />
                    ) : (
                        <Image src={autor_image} className="rounded-full w-10 h-10 z-10 " width={40} height={40} alt="profile" />
                    )
                }
                <div className='flex-col flex '>
                    <p className='text-xl font-bold'>
                        {autor ? autor : "Nome do usuário"}
                    </p>
                    <p>
                        Postado há {
                            timePassed
                        }
                    </p>
                </div>
            </div>
            <div className='flex flex-col justify-start items-center  w-1/2 max-sm:w-full max-sm:p-0'>
                {
                    !image ? (
                        <div className='flex justify-center items-center w-full h-80 bg-slate-300 rounded-lg'>
                            <p className='text-2xl font-bold text-slate-100'>
                                Sem imagem
                            </p>
                        </div>
                    ) : (
                        <Image src={image} width={1000} height={1000} alt="" className='rounded-lg w-full aspect-video' />
                    )
                }
            </div>
            <div className='flex flex-col justify-start items-start gap-4 p-2 w-1/2 max-sm:w-full max-sm:p-2'>
                <p className='text-x font-bold text-justify text-black'>
                    {description}
                </p>
            </div>

            <div className="flex flex-col justify-start items-start w-1/2 mt-6 mb-12 max-sm:w-full max-sm:p-1 gap-2">
                <p className='text-2xl font-bold w-'>
                    Comentários
                </p>
                <div className='commentContainer flex flex-row justify-start items-center gap-2 p-2 w-full'>
                    {
                        !user_image ? (
                            <FontAwesomeIcon icon={faUserAlt} className="rounded-full w-4 h-4 p-2 z-10 shadow-sm border-2" width={40} height={40} />
                        ) : (
                            <Image src={user_image} className="rounded-full w-10 h-10 z-10 " width={40} height={40} alt="profile" />
                        )
                    }
                    <div className='flex-col flex w-full justify-end'>
                        <p className='font-bold'>
                            {user ? user : "Desconhecido"}
                        </p>
                        <div className='relative w-full h-auto flex flex-row'>
                            <input value={comment} type="text" name="comment" id="comment" placeholder='Adicione um comentário' className='p-0'
                                onChange={(e) => setComment(e.target.value)} onKeyDownCapture={
                                    (e) => {
                                        if (e.key === 'Enter') {
                                            handleComment();
                                        }
                                    }
                                } />
                            <button className='text-blue-500 w-10 h-10'
                                onClick={handleComment}
                            ><FontAwesomeIcon icon={faPaperPlane} /></button>
                        </div>
                    </div>
                </div>
                <div className='w-full'>
                    {
                        comments.map((comment) => {
                            console.log(comment)
                            return (

                                <div className='commentContainer flex flex-row justify-start items-center gap-2 p-2 w-full mb-1' key={comment.id}>
                                    {
                                        !comment?.imagem_autor_comentario ? (
                                            <FontAwesomeIcon icon={faUserAlt} className="rounded-full w-3 h-3 text-md p-1  z-10 shadow-sm border-2" width={40} height={40} />
                                        ) : (
                                            <Image src={comment.imagem_autor_comentario} className="rounded-full w-6 h-6 z-10 " width={40} height={40} alt="profile" />
                                        )
                                    }
                                    <div className='flex-col flex w-full justify-end'>
                                        <p className='font-bold'>
                                            {
                                                comment.autor_comentario_nome == user ? (
                                                    <p className='font-bold'>
                                                        Você
                                                    </p>
                                                ) : (
                                                    comment.autor_comentario_nome
                                                )
                                            }
                                        </p>
                                        <p className='text-justify'>
                                            {comment.conteudo_comentario}
                                        </p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default NoticeContent
