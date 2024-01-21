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
                        const response = await PostApi.DeleteFavoritePosts(notice.id);
                        if (!response) return console.log('error');
                        if (response == null) return console.log('error');
                        if (response == undefined) return console.log('error');
                        setIsFavorite(false);
                    } else {
                        const response = await PostApi.CreateFavoritePosts(notice.id);
                        if (!response) return console.log('error');
                        if (response == null) return console.log('error');
                        if (response == undefined) return console.log('error');
                        setIsFavorite(true);
                    }
                }
            } />
            <Link href={`noticias/${notice?.id}`} className=' underline flex items-center p-4'>
                {notice?.titulo_post}
            </Link>
        </div>
    )
}

export default RecentNotice;