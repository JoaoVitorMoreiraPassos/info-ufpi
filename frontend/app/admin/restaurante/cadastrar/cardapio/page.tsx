'use client';
import SideBar from '@/app/components/SideBar'
import '@/app/globals.css'
import Header from '@/app/components/Header'
import './style.css'
import { metadata } from '@/app/layout'
import Footer from '@/app/components/Footer'
import MealForm from '@/app/components/MealForm'
import MealFormsContainer from '@/app/components/MealFormsContainer'
import { useState, useEffect, use } from 'react'
import axios from 'axios'
import { List } from 'postcss/lib/list';
import UserApi from '@/app/api/user';
import api from '@/app/api/ru';

interface Item {
    id: number,
    nome_refeicao: string,
    tipo_refeicao: string,
}

export default function CadastrarRefeicao() {
    const [regularRecipes, setRegularRecipes] = useState<Array<Item>>([])
    const [vegRecipes, setVegRecipes] = useState<Array<Item>>([])
    const [followUps, setFollowUps] = useState<Array<Item>>([])

    useEffect(() => {
        const getUser = async () => {
            const response = await UserApi.GetLoggedUser();
            if (!response) window.location.href = '/';
            if (response == null) return console.log('error');
            if (response == undefined) return console.log('error');
            if (!response.refeicao_permissoes) window.location.href = '/perfil';
        }
        getUser()
    })

    useEffect(() => {
        document.title = 'Cadastrar Refeição'
        async function getAlimentos() {
            const response = await api.getAlimentos();
            console.log(response)
            let items: Array<Item> = response.results;
            console.log(items)
            const reg = items.filter((item) => item.tipo_refeicao === 'N');
            const veg = items.filter((item) => item.tipo_refeicao === 'V');
            const fol = items.filter((item) => item.tipo_refeicao === 'A');
            if (reg) {
                setRegularRecipes(reg);
            }
            if (veg) {
                setVegRecipes(veg);
            }
            if (fol) {
                setFollowUps(fol);
            }
        }
        getAlimentos();
    }, [])

    useEffect(() => {
        console.log(regularRecipes)
        console.log(vegRecipes)
        console.log(followUps)
    }, [regularRecipes, vegRecipes, followUps])

    return (
        <div>
            <div className="flex flex-row justify-start" >
                <SideBar />
                <div className='mainContainer w-full'>
                    <Header page_index={-1} />
                    <main className=''>
                        {
                            regularRecipes.length == 0 && vegRecipes.length == 0 && followUps.length == 0 ?
                                <p className='text-2xl text-center'>
                                    Ainda não há alimentos cadastrados no sistema.
                                </p>
                                :
                                <MealFormsContainer regular_recipes={regularRecipes} veg_recipes={vegRecipes} follow_ups={followUps} />
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