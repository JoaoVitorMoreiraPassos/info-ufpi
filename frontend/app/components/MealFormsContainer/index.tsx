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

    const Submit = () => {
        console.log("aqui entrou.");
        const morging_meal = document.querySelector('#café-da-manhã-form') as HTMLInputElement;
        const lunch_meal = document.querySelector('#almoço-form') as HTMLInputElement;
        const dinner_meal = document.querySelector('#jantar-form') as HTMLInputElement;

        const morging_meal_inputs = morging_meal?.querySelectorAll('input[type="checkbox"]') as NodeListOf<HTMLInputElement>;
        const lunch_meal_inputs = lunch_meal?.querySelectorAll('input[type="checkbox"]') as NodeListOf<HTMLInputElement>;
        const dinner_meal_inputs = dinner_meal?.querySelectorAll('input[type="checkbox"]') as NodeListOf<HTMLInputElement>;

        const morging_meal_checked_inputs = Array.from(morging_meal_inputs).filter((input) => input.checked);
        const lunch_meal_checked_inputs = Array.from(lunch_meal_inputs).filter((input) => input.checked);
        const dinner_meal_checked_inputs = Array.from(dinner_meal_inputs).filter((input) => input.checked);

        const morging_meal_checked_inputs_values = morging_meal_checked_inputs.map((input) => [input.name.slice(0, -1), input.name.slice(-1),]);
        const lunch_meal_checked_inputs_values = lunch_meal_checked_inputs.map((input) => [input.name.slice(0, -1), input.name.slice(-1),]);
        const dinner_meal_checked_inputs_values = dinner_meal_checked_inputs.map((input) => [input.name.slice(0, -1), input.name.slice(-1),]);

        console.log(morging_meal_checked_inputs_values);
        console.log(lunch_meal_checked_inputs_values);
        console.log(dinner_meal_checked_inputs_values);

        const morning_meal_selects = morging_meal?.querySelectorAll('select') as NodeListOf<HTMLSelectElement>;
        const lunch_meal_selects = lunch_meal?.querySelectorAll('select') as NodeListOf<HTMLSelectElement>;
        const dinner_meal_selects = dinner_meal?.querySelectorAll('select') as NodeListOf<HTMLSelectElement>;

        const meals = {
            'date': date,
            'morging_meal': {
                'regular_recipe': morning_meal_selects[0].value,
                'veg_recipe': morning_meal_selects[1].value,
                'follow_ups': morging_meal_checked_inputs_values,
            },
            'lunch_meal': {
                'regular_recipe': lunch_meal_selects[0].value,
                'veg_recipe': lunch_meal_selects[1].value,
                'follow_ups': lunch_meal_checked_inputs_values,
            },
            'dinner_meal': {
                'regular_recipe': dinner_meal_selects[0].value,
                'veg_recipe': dinner_meal_selects[1].value,
                'follow_ups': dinner_meal_checked_inputs_values,
            },
        }

        // Verifica se os campos estão vazios
        // O usuário deve preencher pelos menos uma das refeições(manhã, almoço ou jantar)

        if (meals.morging_meal.regular_recipe === '' && meals.morging_meal.veg_recipe === '' && meals.morging_meal.follow_ups.length === 0) {
            alert('Preencha as opções de café da manhã');
            return;
        }

        if (meals.lunch_meal.regular_recipe === '' && meals.lunch_meal.veg_recipe === '' && meals.lunch_meal.follow_ups.length === 0) {
            alert('Preencha as opções de almoço');
            return;
        }

        if (meals.dinner_meal.regular_recipe === '' && meals.dinner_meal.veg_recipe === '' && meals.dinner_meal.follow_ups.length === 0) {
            alert('Preencha as opções de jantar');
            return;
        }

        const formdate = new FormData();
        formdate.append('date', meals.date);
        formdate.append('morging_meal', JSON.stringify(meals.morging_meal));
        formdate.append('lunch_meal', JSON.stringify(meals.lunch_meal));
        formdate.append('dinner_meal', JSON.stringify(meals.dinner_meal));

        const url = 'http://localhost:3333/meal';
        const options = {
            method: 'POST',
            body: formdate,
        }

        fetch(url, options)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            })
    }

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
                    <button className='bg-green-500 text-white w-1/2 h-14 rounded-xl text-xl'
                        onClick={() => Submit()}
                    >
                        Cadastrar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MealFormsContainer;