import React from 'react';
import SideBar from '@/app/components/SideBar';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import NoticeContent from '@/app/components/MainContent/NoticeContent';
import { useRouter } from 'next/router';
import { Inria_Serif } from 'next/font/google';
import '@/app/globals.css';

const inria_serif = Inria_Serif({ subsets: ['latin'], weight: ["300"] })

export default function Notice() {

    const router = useRouter();
    const { slug } = router.query;

    React.useEffect(() => {
        // Modifique o metadata após a renderização inicial
        document.title = "";
    }, []);


    return (
        <div data-theme='light' className={inria_serif.className}>
            <div className="flex min-h-screen flex-row justify-start">
                <SideBar />
                <div className='mainContainer'>
                    <Header page_index={0} />
                    <main>
                        <NoticeContent slug={slug as string} />
                    </main>
                </div>
            </div >
            <footer>
                <Footer />
            </footer>
        </div>
    );
};

