'use client';
import React from 'react';
import { useState } from 'react';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface recipe {
    id: number,
    name: string,
    type: string
}

const MealForm = (
    { meal, regular_recipes, veg_recipes, follow_ups }: {
        meal: string, regular_recipes: recipe[], veg_recipes: recipe[], follow_ups: recipe[]
    }
) => {
    const title = meal;
    meal = meal.trim().replaceAll(' ', '-').toLowerCase();
    const [adicional, setAdditional] = useState<string | undefined>(undefined);

    const add_additional = (meal: string) => {
        const input = document.querySelector(`#${meal}`) as HTMLInputElement;
        const value = input.value;
        if (value) {
            const item: recipe = {
                id: follow_ups[follow_ups.length - 1].id + 1,
                name: value,
                type: 'follow-up',
            };
            follow_ups.push(item);
            input.value = '';
            const alreadyRegisterElement = document.querySelector(`.${meal}-follow-ups`);
            if (alreadyRegisterElement) {
                let div = document.createElement('div');
                div.id = item.type + item.id;
                alreadyRegisterElement.innerHTML += `
                        <div class='flex flex-row gap-2 items-center w-1/4 ' >
                            <input type="checkbox" name=${item.name + item.id} id=${item.name + meal} class='w-6 h-6' />
                            <label htmlFor=${item.name + meal} class='text-lg'>
                                ${item.name}
                            </label>
                        </div>
                    
                `
            }
        }
    }

    return (
        <div className={'w-full transition-all duration-500 ease-in-out flex flex-col items-center py-8 bg-blue-200 rounded-xl ' + meal}>
            <p className='text-center text-2xl p-4'>{title}</p>
            <div className='flex flex-col items-center gap-4' >
                <div className='flex flex-row gap-2 flex-wrap justify-center'>
                    <div className='flex flex-col gap-2'>
                        <p className='text-center text-xl'>
                            Refeição Geral
                        </p>
                        <select name="" id="" className='h-16 px-4 w-60' placeholder='Refeição Normal'>
                            {
                                regular_recipes.map(item => {
                                    if (item.type === 'normal-recipe') {
                                        return (
                                            <option value={item.id} key={'ref' + item.id}>{item.name}</option>
                                        )
                                    }
                                })
                            }
                        </select>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <p className='text-center text-xl'>
                            Refeição Vegetariana
                        </p>
                        <select name="" id="" className='h-16 px-4 w-60' placeholder='Refeição Vegetariana'>
                            {
                                veg_recipes.map(item => {
                                    if (item.type === 'veg-recipe') {
                                        return (
                                            <option value={item.id} key={'ref_veg' + item.id}>{item.name}</option>
                                        )
                                    }
                                })

                            }
                        </select>
                    </div>
                </div>
                <p className='text-xl'>
                    Acompanhamentos
                </p>
                <div className={'flex flex-row justify-center flex-wrap gap-y-2 gap-x-2 pl-10 ' + meal + '-follow-ups'}>

                    {
                        follow_ups.map(item => {
                            if (item.type === 'follow-up') {
                                return (
                                    <div key={item.id} className='flex flex-row gap-2 items-center w-1/4 ' >
                                        <input type="checkbox" name={item.name + item.id} id={item.name + meal} className='w-6 h-6' />
                                        <label htmlFor={item.name + meal} className='text-lg'>
                                            {item.name}
                                        </label>
                                    </div>
                                )
                            }
                        })
                    }
                </div>
                <div className='flex flex-row gap-2 items-center justify-center  w-96 relative ' >

                    <input type="text" placeholder='+ Adicional' className="w-96 bg-slate-200 min-w-200" id={meal} onKeyDown={
                        (e) => {
                            if (e.key === 'Enter') {
                                add_additional(meal);
                            }
                        }
                    } />
                    <button className='bg-green-500 text-white w-1/5 absolute right-0 h-14 rounded-2xl text-xl' onClick={
                        () => {
                            add_additional(meal);
                        }
                    }>
                        <FontAwesomeIcon icon={faCheck} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MealForm
