'use client'
import React from 'react';
import { useRouter } from 'next/router';
import '@/app/globals.css';
import '@/app/autenticacao/style.css'
import Image from 'next/image';
import { useState, useEffect } from 'react';
import UserApi from '@/app/api/user';
import PostApi from '@/app/api/post';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight, faPen, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import SideBar from '@/app/components/SideBar';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import NoticeCardPerfil from '@/app/components/MainContent/NoticeCardPerfil';
import { Auth } from '@/app/components/Auth';
import Link from 'next/link';
import './style.css'


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

interface Profile {
    id: number,
    first_name: string,
    last_name: string,
    username: string,
    email: string,
    foto_perfil: string,
    post_permissoes: boolean,
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


export default function Perfil() {
    const router = useRouter();
    const { slug } = router.query;
    const [username, setUsername] = useState<string>("");
    const [loggedUser, setLoggedUser] = useState<string>("");
    const [isUserLogged, setIsUserLogged] = useState<boolean>(false);
    const [profile, setProfile] = useState<Profile>({
        id: 0,
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        foto_perfil: "",
        post_permissoes: false,
    });
    const [noticias_publicadas, setNoticiasPublicadas] = useState<Noticia[]>([]);
    const [noticiasNext, setNoticiasNext] = useState<string>("");
    const [noticiasPrevious, setNoticiasPrevious] = useState<string>("");
    const [favoritos, setFavoritos] = useState<Noticia[]>([]);
    const [favoritosNext, setFavoritosNext] = useState<string>("");
    const [favoritosPrevious, setFavoritosPrevious] = useState<string>("");

    useEffect(() => {
        if (!slug) return;
        setUsername(slug.toString());
    }, [slug]);
    useEffect(() => {
        if (!username) return;
        const getUser = async () => {
            try {
                const user = await UserApi.SearchUser(username);
                if (!user) {
                    window.location.href = '/';
                    return;
                };
                setProfile(user);
                try {
                    const loggedUser = await UserApi.GetLoggedUser();
                    if (!loggedUser) {
                        setIsUserLogged(false);
                        return;
                    }
                    if (loggedUser.username === user.username) {
                        setIsUserLogged(true);
                    }
                    else {
                        setIsUserLogged(false);
                    }

                } catch {
                    setIsUserLogged(false);
                }
            }
            catch {

            }
        }

        const getPosts = async () => {
            try {
                const response = await PostApi.ListPostsByUser(username);
                if (!response) return;
                if (response == null) return;
                if (response == undefined) return;
                console.log(response)
                setNoticiasPublicadas(response.results);
                setNoticiasNext(response.next);
                setNoticiasPrevious(response.previous);
            }
            catch (error: any) {
                if (error.response.status === 401) {
                    window.location.href = '/autenticacao/login';
                    return;
                }
            }
        }

        const getFavoritos = async () => {
            try {
                const favoritos: Favorito = await PostApi.ListFavoritePosts();
                if (!favoritos) return;
                if (favoritos?.count == 0) return;

                let favoritosList: Noticia[] = [];
                for (let favorito in favoritos.results) {
                    const response = await PostApi.GetPost(favoritos.results[favorito].post_favorito);
                    if (!response) continue;
                    favoritosList.push(response);
                }
                setFavoritos(favoritosList);
                setFavoritosNext(favoritos.next);
                setFavoritosPrevious(favoritos.previous);
            }
            catch (err) {
            }
        }

        getUser();
        getPosts();
        getFavoritos();
    }, [username]);



    const [screenWidth, setScreenWidth] = useState<number>(0);
    React.useEffect(() => {
        setScreenWidth(window.innerWidth);
        window.addEventListener("resize", () => {
            setScreenWidth(window.innerWidth);
        });
    }, []);

    let mainClasses = "mainContainer ";
    return (
        <div data-theme="light">
            <Auth />
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
                            <div className={" bannerContent flex flex-col justify-center w-full h-1/4 z-10 items-start" + (screenWidth <= 1024 ? " items-center" : " items-start")}>
                                {
                                    !profile.foto_perfil ?
                                        <FontAwesomeIcon className="rounded-full w-20 h-20 p-14 z-10 bg-slate-300 text-white text-sm" icon={faUserAlt} />
                                        :
                                        <Image className="rounded-full w-40 h-40 z-10" width={1000} height={1000} src={profile.foto_perfil} alt="profile" />
                                }
                                <div className='w-full bg-slate-400 absolute bottom-0 left-0 h-28 opacity-50'>
                                </div>
                                <p className="text-3xl text-left text-white bottom-8 absolute opacity-100">{profile.first_name + " " + profile.last_name}</p>
                                {
                                    isUserLogged &&
                                    <Link href="/perfil/editar-perfil">
                                        <FontAwesomeIcon className="absolute bottom-6 right-2 w-6 h-6 p-2 text-lg bg-slate-300 text-white rounded-full cursor-pointer" icon={faPen} />
                                    </Link>
                                }
                            </div>
                        </div>
                        <h1 className='text-black text-xl pl-14 pt-14 w-full max-[768px]:flex max-[768px]:justify-center max-[768px]:pl-0'>Notícias Publicadas:</h1>
                        {
                            noticias_publicadas.length > 0 ? (
                                <div className="w-full flex justify-center items-center">
                                    <div className=' my-carousel h-full flex w-11/12 max-md:w-full flex-row px-2 pb-2 ml-3 justify-start items-start gap-5 overflow-x-scroll mr-10 pr-10 max-md:mr-0 max-md:pr-0 max-md:ml-1'>
                                        {
                                            noticias_publicadas.map((notice, index) => {
                                                return (
                                                    <NoticeCardPerfil notice_infos={notice} key={'notice' + index} self_profile={isUserLogged} isMarked={false} showStar={!isUserLogged} />
                                                )
                                            })
                                        }
                                        {
                                            noticiasNext &&
                                            <button className='flex items-center justify-center self-center w-20 h-20 rounded-full' onClick={async () => {
                                                if (!noticiasNext) return;
                                                try {
                                                    const response = await PostApi.ListNextPostsByUser(noticiasNext);
                                                    if (!response) return;
                                                    if (response == null) return;
                                                    if (response == undefined) return;

                                                    setNoticiasNext(response.next);
                                                    setNoticiasPrevious(response.previous);
                                                    let items: Noticia[] = [];
                                                    for (let item in response.results) {
                                                        items.push(response.results[item]);
                                                    }
                                                    setNoticiasPublicadas([...noticias_publicadas, ...items]);
                                                }
                                                catch (error: any) {
                                                    if (error.response.status === 401) {
                                                        window.location.href = '/autenticacao/login';
                                                        return;
                                                    }
                                                }
                                            }} >
                                                <FontAwesomeIcon className="text-5xl text-slate-900" icon={faArrowAltCircleRight} />
                                            </button>
                                        }
                                    </div>
                                </div>
                            ) : (
                                <h1 className='text-3xl text-center text-slate-900 mt-10 mb-10'>Este usuário não possui noticias cadastradas</h1>
                            )
                        }
                        {
                            isUserLogged &&
                            <h1 className='text-black text-xl pl-14 pt-14 w-full max-[768px]:flex max-[768px]:justify-center max-[768px]:pl-0'>Notícias Favoritas:</h1>
                        }{
                            isUserLogged && favoritos.length > 0 && (
                                <div className="w-full flex justify-center items-center">
                                    <div className=' my-carousel h-full flex w-11/12 max-md:w-full flex-row px-2 pb-2 ml-3 justify-start items-start gap-5 overflow-x-scroll mb-12 mr-10 pr-10 max-md:mr-0 max-md:pr-0 max-md:ml-1'>
                                        {
                                            favoritos.map((notice, index) => {
                                                return (
                                                    <NoticeCardPerfil notice_infos={notice} key={'notice' + index} self_profile={isUserLogged} isMarked={true} showStar={!loggedUser} />
                                                )
                                            })
                                        }
                                        {
                                            favoritosNext &&
                                            <button className='flex items-center justify-center self-center w-20 h-full rounded-full mr-8' onClick={async () => {
                                                if (!favoritosNext) return;
                                                try {
                                                    const response = await PostApi.ListNextFavoritePosts(favoritosNext);
                                                    if (!response) return;
                                                    if (response == null) return;
                                                    if (response == undefined) return;

                                                    setFavoritosNext(response.next);
                                                    setFavoritosPrevious(response.previous);
                                                    let items: Noticia[] = [];
                                                    for (let item in response.results) {
                                                        const noticia = await PostApi.GetPost(response.results[item].post_favorito);
                                                        if (!noticia) continue;
                                                        items.push(noticia);
                                                    }
                                                    console.log([...favoritos, ...items])
                                                    setFavoritos([...favoritos, ...items]);
                                                }
                                                catch (error: any) {
                                                    if (error.response.status === 401) {
                                                        window.location.href = '/autenticacao/login';
                                                        return;
                                                    }
                                                }
                                            }} >
                                                <FontAwesomeIcon className="text-5xl text-slate-900" icon={faArrowAltCircleRight} />
                                            </button>
                                        }
                                    </div>
                                </div>
                            )}{
                            isUserLogged && favoritos.length == 0 &&
                            (
                                <h1 className='text-3xl text-center text-slate-900 mt-10 mb-10'> Você não possui favoritos </h1>
                            )

                        }
                    </main>
                </div>
            </div >
            <footer>
                <Footer />
            </footer>
        </div >
    )
}
