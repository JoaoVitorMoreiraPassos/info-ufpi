'use client'
import React, { useEffect } from 'react'
import MealForm from '../MealForm'
import { useState } from 'react'
import { format } from 'date-fns-tz';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import axios from 'axios';
import api from '@/app/api/ru';

interface Item {
    id: number,
    nome_refeicao: string,
    tipo_refeicao: string
}

interface cardapio {
    data: string,
    tipo: string,
    alimentos: Array<Number>,
    alimentos_adicionais: Array<Number>
}

const MealFormsContainer = ({ regular_recipes, veg_recipes, follow_ups }: { regular_recipes: Item[], veg_recipes: Item[], follow_ups: Item[] }) => {

    const brazilianTimeZone = 'America/Sao_Paulo';

    const currentDateTimeInBrazil = format(new Date(), 'yyyy-MM-dd', {
        timeZone: brazilianTimeZone,
    });

    const [date, setDate] = useState(currentDateTimeInBrazil);
    const [almocoGeral, setAlmocoGeral] = useState();
    const [almocoVeg, setAlmocoVeg] = useState();
    const [almocoAcompanhamentos, setAlmocoAcompanhamentos] = useState<Array<Item>>([]);
    const [jantarGeral, setJantarGeral] = useState();
    const [jantarVeg, setJantarVeg] = useState();
    const [jantarAcompanhamentos, setJantarAcompanhamentos] = useState<Array<Item>>([]);



    const Submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (almocoGeral && almocoVeg && almocoAcompanhamentos.length > 0 && jantarGeral && jantarVeg && jantarAcompanhamentos.length > 0) {

            const sendCardapio = async (cardapio: cardapio) => {
                try {
                    const response = await api.postCardapio(cardapio);
                    if (response.status === 201) {
                        toast.success(`${cardapio.tipo === 'A' ? 'Almoço' : 'Jantar'} cadastrado com sucesso!`);
                    }
                } catch (error) {
                    return;
                }
            }
            const almoco: cardapio = {
                data: date,
                tipo: 'A',
                alimentos: [almocoGeral, almocoVeg, ...almocoAcompanhamentos.map((item) => item.id)],
                alimentos_adicionais: []
            }
            const jantar: cardapio = {
                data: date,
                tipo: 'J',
                alimentos: [jantarGeral, jantarVeg, ...jantarAcompanhamentos.map((item) => item.id)],
                alimentos_adicionais: []
            }
            const result = await Promise.all([sendCardapio(almoco), sendCardapio(jantar)]);
        }
        else {
            toast.error('Preencha todos os campos!');
        }
    }

    return (
        <form className='flex-col flex py-14 px-6 justify-start items-center w-full gap-8' onSubmit={Submit}>
            <ToastContainer />
            <p className='text-2xl'>
                Cadastrar Refeição
            </p>
            <section className='flex-col flex gap-2 w-full items-center'>
                <label htmlFor="date">
                    Data:
                </label>
                <input
                    type="date"
                    name="date"
                    id="date"
                    value={date}
                    className='border border-gray-400 rounded-md w-auto text-center'
                    onChange={(e) => setDate(e.target.value)}
                />
            </section>

            <div className='h-full w-full'>
                <div className=' flex flex-row justify-center min-w-300 gap-4 border-blue-500 flex-wrap'>
                    {/* <section >
                        <MealForm regular_recipes={regular_recipes} veg_recipes={veg_recipes} meal='Café da Manhã' follow_ups={follow_ups} />
                    </section> */}
                    <section >
                        <MealForm regular_recipes={regular_recipes} veg_recipes={veg_recipes} meal='Almoço' follow_ups={follow_ups} listenners={[[almocoGeral, setAlmocoGeral], [almocoVeg, setAlmocoVeg], [almocoAcompanhamentos, setAlmocoAcompanhamentos]]} />
                    </section>
                    <section >
                        <MealForm regular_recipes={regular_recipes} veg_recipes={veg_recipes} meal='Jantar' follow_ups={follow_ups} listenners={[[jantarGeral, setJantarGeral], [jantarVeg, setJantarVeg], [jantarAcompanhamentos, setJantarAcompanhamentos]]} />
                    </section>
                </div>
                <div className='flex flex-row w-full justify-center mt-12 flex-wrap-reverse items-start gap-8 px-8 pb-8'>
                    <button className='bg-green-500 text-white w-1/2 h-14 rounded-xl text-xl' type='submit'>
                        Cadastrar
                    </button>
                </div>
            </div>
        </form>
    )
}
export default MealFormsContainer