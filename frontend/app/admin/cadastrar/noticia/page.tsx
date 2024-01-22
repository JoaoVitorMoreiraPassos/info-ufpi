'use client';
import ImageInput from '@/app/components/ImageInput';
import SideBar from '@/app/components/SideBar';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { metadata } from '@/app/layout';
import '@/app/globals.css';
import './style.css';
import { useState, useEffect } from 'react';
import NoticeForm from '@/app/components/NoticeForm';
import UserApi from '@/app/api/user';


const CadastrarNoticia = () => {
    useEffect(() => {
        const getUser = async () => {
            const response = await UserApi.GetLoggedUser();
            if (!response) window.location.href = '/';
        }
        getUser()
    })

    useEffect(() => {
        document.title = 'Cadastrar Notícia'
    }, [])
    return (
        <div>
            <div className="flex flex-row justify-start" >
                <SideBar />
                <div className='mainContainer'>
                    <Header page_index={-1} />
                    <main>
                        <NoticeForm />
                    </main>
                </div>
            </div>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}

export default CadastrarNoticia;