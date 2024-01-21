'use client';
import React, { use } from 'react';
import NoticeCardPerfil from '../components/MainContent/NoticeCardPerfil';
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Image from 'next/image';
import './style.css'
import UserApi from '../api/user';
import PostApi from '../api/post';
import { useState, useEffect } from 'react';
import { Interface } from 'readline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

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

interface Favorito {
    count: number;
    next: string;
    previous: string;
    results: [
        {
            id: number;
            post_favorito: number;
            autor_favorito: number;
        }
    ]
}

const Perfil = () => {

    const [profile, setProfile] = useState<Profile>({
        id: 0,
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        foto_perfil: "",
        post_permissoes: false,
    });
    const [favoritos, setFavoritos] = useState<Noticia[]>([]);

    useEffect(() => {
        const getUser = async () => {
            try {
                const user: Profile | undefined = await UserApi.GetLoggedUser();
                if (!user) {
                    window.location.href = '/autenticacao/login';
                    return;
                };
                setProfile(user);
            }
            catch {
                console.log("Erro ao buscar usuario");
            }
        }
        const getFavoritos = async () => {
            try {
                const favoritos: Favorito = await PostApi.ListFavoritePosts();
                console.log(favoritos);
                if (!favoritos) return;
                if (favoritos?.count == 0) return;

                let favoritosList: Noticia[] = [];
                for (let favorito in favoritos.results) {
                    const response = await PostApi.GetPost(favoritos.results[favorito].post_favorito);
                    if (!response) continue;
                    favoritosList.push(response);
                }
                console.log(favoritosList)
                setFavoritos(favoritosList);
            }
            catch (err) {
                console.log(err)
                console.log("Erro ao buscar favoritos");
            }
        }

        getUser();
        getFavoritos();
    }, []);

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
            <div className="topContainer flex flex-row justify-start items-start" >
                <SideBar />
                <div className={mainClasses}>
                    <Header page_index={-1} />
                    <main>
                        <div className="perfilBanner fklex flex-col justify-center items-start w-full h-auto p-20 relative">
                            <div className="absolute top-0 left-0 w-full h-full bg-cyan-400 z-0"></div>
                            {/* Adicionar background do perfil */}
                            {/* {
                                !profile?.background_image ?
                                    :
                                    <Image className="absolute top-0 left-0 w-full h-full object-cover z-0" width={1920} height={554} src={profile?.background_image} alt="background" />
                            } */}
                            <div className={" bannerContent flex flex-col justify-center w-full h-1/4 z-50 items-start" + (screenWidth <= 1024 ? " items-center" : " items-start")}>
                                {
                                    !profile.foto_perfil ?
                                        <FontAwesomeIcon className="rounded-full w-20 h-20 p-14 z-10 bg-slate-300 text-white text-sm" icon={faUserAlt} />
                                        :
                                        <Image className="rounded-full w-60 h-60 z-10" width={1000} height={1000} src={profile.foto_perfil} alt="profile" />
                                }
                                <div className='w-full bg-slate-400 absolute bottom-0 left-0 h-28 opacity-50'>
                                </div>
                                <p className="text-3xl text-left text-white bottom-8 absolute opacity-100">{profile.first_name + " " + profile.last_name}</p>
                                <Link href="/perfil/editar-perfil">
                                    <FontAwesomeIcon className="absolute bottom-6 right-2 w-6 h-6 p-2 text-lg bg-slate-300 text-white rounded-full cursor-pointer" icon={faPen} />
                                </Link>
                            </div>
                        </div>
                        {
                            favoritos.length > 0 ? (
                                <div className='cardsContainer flex w-full flex-row flex-wrap p-14 justify-center items-start gap-10'>
                                    {
                                        favoritos.map((notice, index) => {
                                            return (
                                                <NoticeCardPerfil notice_infos={notice} key={'notice' + index} />
                                            )
                                        })
                                    }
                                </div>
                            ) : (
                                <h1 className='text-3xl text-center text-slate-900 mt-10 mb-10'>Você não possui favoritos</h1>
                            )
                        }
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
