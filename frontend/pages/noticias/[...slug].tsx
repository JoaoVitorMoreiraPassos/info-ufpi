import { useRouter } from 'next/router';

const NoticiasPage = () => {
    const router = useRouter();
    const { slug } = router.query;

    return (
        <div>
            <h1>Notícias</h1>
            {slug && (
                <p>
                    Slug: {Array.isArray(slug) ? slug.join('/') : slug}
                </p>
            )}
        </div>
    );
};

export default NoticiasPage;
