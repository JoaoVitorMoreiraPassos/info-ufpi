import './style.css'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import PostApi from '@/app/api/post'
import { useState, useEffect } from 'react'

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

const RecentNotice = ({ notice, favorito }: { notice: Notice, favorito: Favorito | undefined }) => {

    const [isFavorite, setIsFavorite] = useState<boolean>(favorito ? true : false);
    const [text, setText] = useState<string>(favorito ? 'text-yellow-500' : 'text-gray-500');

    useEffect(() => {
        if (isFavorite) {
            setText('text-yellow-500');
        } else {
            setText('text-gray-500');
        }
    }, [isFavorite])


    return (
        <div className='recentNotice max-w-full  cursor-pointer my-4 h-auto p-2 flex items-center'>
            <FontAwesomeIcon icon={faStar} className={
                text + ' text-2xl mr-2 transition duration-500 ease-in-out'
            } onClick={
                async (e) => {
                    if (isFavorite) {
                        try {
                            const response = await PostApi.DeleteFavoritePosts(notice.id);
                            if (!response) return;
                            if (response == null) return;
                            if (response == undefined) return;
                            setIsFavorite(false);
                        } catch (error: any) {
                            if (error.response.status === 401) {
                                window.location.href = '/autenticacao/login';
                                return;
                            }
                        }
                    } else {
                        try {
                            const response = await PostApi.CreateFavoritePosts(notice.id);
                            if (!response) return;
                            if (response == null) return;
                            if (response == undefined) return;
                            setIsFavorite(true);
                        } catch (error: any) {
                            if (error.response.status === 401) {
                                window.location.href = '/autenticacao/login';
                                return;
                            }

                        }
                    }
                }
            } />
            <Link href={`noticias/${notice?.id}`} className=' underline flex justify-start items-start p-4 max-[700px]:px-2 text-sm'>
                {notice?.titulo_post}
            </Link>
        </div>
    )
}

export default RecentNotice;