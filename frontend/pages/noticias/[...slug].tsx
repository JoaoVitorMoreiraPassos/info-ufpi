import { useRouter } from 'next/router';
import { metadata } from '@/app/layout';

interface Noticia {
    titulo: string;
    descricao: string;
    imagem: string;
    data: string;
    autor: string;
    categoria: string;
}

const NoticiasPage = () => {
    const router = useRouter();
    const { slug } = router.query;

    const noticia = async () => {
        const response = await fetch('http://localhost:3333/noticias/' + slug)
        const data: Noticia = await response.json()
        return data
    }


    return (
        < div >
            <h1>Notícias</h1>
            {
                slug && (
                    <p>
                        Slug: {Array.isArray(slug) ? slug.join('/') : slug}
                    </p>
                )
            }
        </div >
    );
};

export default NoticiasPage;
