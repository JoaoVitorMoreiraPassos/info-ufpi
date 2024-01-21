'use client';
import SideBar from '@/app/components/SideBar';
import '@/app/globals.css';
import Header from '@/app/components/Header';
import { metadata } from '@/app/layout';
import Footer from '@/app/components/Footer';
import RecipeDelete from '@/app/components/RecipeDelete';
import RecipeItemRegister from '@/app/components/RecipeItemRegister';
import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import api from '@/app/api/ru';


interface Item {
    id: number,
    nome_refeicao: string,
    tipo_refeicao: string
}


export default function CadastrarCardapio() {

    const [Items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        document.title = 'Cadastrar Alimentos';

        async function getAlimentos() {
            let response = await api.getAlimentos();
            setItems(response.results);
        }
        getAlimentos();
    }, [])

    return (
        <div>
            <div className="flex flex-row justify-start" >
                <SideBar />
                <div className='mainContainer'>
                    <Header page_index={-1} />
                    <main className='flex-row flex p-14 justify-center gap-10 flex-wrap'>
                        <RecipeItemRegister items={Items?.filter((item) => item.tipo_refeicao === 'N')} title='Cadastrar Refeição' tipo='N' />

                        <RecipeItemRegister items={Items?.filter((item) => item.tipo_refeicao === 'V')} title='Cadastrar Refeição Vegetariana' tipo="V" />

                        <RecipeItemRegister items={Items?.filter((item) => item.tipo_refeicao === 'A')} title='Cadastrar Acompanhamento' tipo="A" />
                    </main>
                </div>
            </div>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}