'use client';
import './style.css';
import React from 'react'
import reactDOM from 'react-dom';
import RecipeDelete from '../RecipeDelete'
import { useState, useEffect } from 'react';
import api from '@/app/api/ru';

interface Item {
    id: number,
    nome_refeicao: string,
    tipo_refeicao: string
}

const RecipeItemRegister = ({ items, title, tipo }: { items: Item[], title: string, tipo: string }) => {

    const [newItem, setNewItem] = useState("");

    const add_item = async (type: string) => {

        try {

            const response = await api.postAlimento({
                nome_refeicao: newItem,
                tipo_refeicao: type,
            })
            console.log(response)
            if (response.status === 201) {
                alert('Refeição cadastrada com sucesso!');
                const input = document.querySelector(`#${type}`) as HTMLInputElement;
                if (newItem !== '') {
                    const item: Item = {
                        id: response.data.id,
                        nome_refeicao: newItem,
                        tipo_refeicao: type,
                    };
                    input.value = '';
                    const alreadyRegisterElement = document.querySelector(`.alreadyRegister.${tipo}`);
                    if (alreadyRegisterElement) {
                        let div = document.createElement('div');
                        div.id = item.tipo_refeicao + item.id;
                        let recipeDelete = <RecipeDelete item={item} />;
                        div.addEventListener('', () => {

                        })
                        reactDOM.render(recipeDelete, div);
                        alreadyRegisterElement.appendChild(div);
                    }
                }
            }
        } catch (error) {
            console.log(error);
            return;
        }


    }

    return (
        <section className='flex-col flex p-8 items-center gap-4 toPutShadow'>
            <div className='flex flex-col gap-2'>
                <label htmlFor={tipo} className='text-xl'>{title}</label>
                <input onKeyDown={
                    (e) => {
                        if (e.key === 'Enter') {
                            add_item(tipo);
                        }
                    }
                } onChange={
                    (e) => {
                        setNewItem(e.target.value);
                    }
                } type="text" name={tipo} id={tipo} className='border border-gray-400 rounded-md w-80' placeholder='+ Nova Refeição' />
                <button type="submit" className='bg-green-500 text-white rounded-xl p-2 w-80 h-14' onClick={
                    () => {
                        add_item(tipo)
                    }
                }>Cadastrar</button>
                <div className={"alreadyRegister gap-4 flex flex-col-reverse py-6 justify-start " + tipo}>

                    {
                        items.map(item => {
                            return (
                                <div key={item.id} >
                                    <RecipeDelete key={item.id} item={item} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}

export default RecipeItemRegister
