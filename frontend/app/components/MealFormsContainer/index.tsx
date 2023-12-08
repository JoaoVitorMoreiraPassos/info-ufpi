'use client'
import React from 'react'
import MealForm from '../MealForm'
import { useState } from 'react'
import { format } from 'date-fns-tz';

interface recipe {
    id: number,
    name: string,
    type: string
}

const MealFormsContainer = ({ regular_recipes, veg_recipes, follow_ups }: { regular_recipes: recipe[], veg_recipes: recipe[], follow_ups: recipe[] }) => {

    const brazilianTimeZone = 'America/Sao_Paulo';

    const currentDateTimeInBrazil = format(new Date(), 'yyyy-MM-dd', {
        timeZone: brazilianTimeZone,
    });

    const [date, setDate] = useState(currentDateTimeInBrazil);
    return (
        <div className='flex-col flex py-14 px-6 justify-start items-center w-full gap-8'>
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
                    <section >
                        <MealForm regular_recipes={regular_recipes} veg_recipes={veg_recipes} meal='Café da Manhã' follow_ups={follow_ups} />
                    </section>
                    <section >
                        <MealForm regular_recipes={regular_recipes} veg_recipes={veg_recipes} meal='Almoço' follow_ups={follow_ups} />
                    </section>
                    <section >
                        <MealForm regular_recipes={regular_recipes} veg_recipes={veg_recipes} meal='Jantar' follow_ups={follow_ups} />
                    </section>
                </div>
                <div className='flex flex-row w-full justify-center mt-12 flex-wrap-reverse items-start gap-8 px-8 pb-8'>
                    <button className='bg-green-500 text-white w-1/2 h-14 rounded-xl text-xl'>
                        Cadastrar
                    </button>
                </div>
            </div>
        </div>



    )
}

export default MealFormsContainer
