'use client';
import './style.css';
import React from 'react'
import reactDOM from 'react-dom';
import RecipeDelete from '../RecipeDelete'

interface Item {
    id: number,
    name: string,
    type: string
}

interface Items {
    items: [Item],
}



const RecipeItemRegister = ({ items, title }: { items: Item[], title: string }) => {

    const add_item = (type: string) => {
        const input = document.querySelector(`#${type}`) as HTMLInputElement;
        const value = input.value;
        if (value) {
            const item: Item = {
                id: items[items.length - 1].id + 1,
                name: value,
                type: type,
            };
            items.push(item);
            input.value = '';
            const alreadyRegisterElement = document.querySelector(`.alreadyRegister.${items[0].type}`);
            if (alreadyRegisterElement) {
                let div = document.createElement('div');
                div.id = item.type + item.id;
                let recipeDelete = <RecipeDelete item={item} />;
                div.addEventListener('', () => {

                })
                reactDOM.render(recipeDelete, div);
                alreadyRegisterElement.appendChild(div);
            }
        }

    }

    return (
        <section className='flex-col flex p-8 items-center gap-4 toPutShadow'>
            <div className='flex flex-col gap-2'>
                <label htmlFor={items[0].type} className='text-xl'>{title}</label>
                <input onKeyDown={
                    (e) => {
                        if (e.key === 'Enter') {
                            add_item(items[0].type);
                        }
                    }
                } type="text" name={items[0].type} id={items[0].type} className='border border-gray-400 rounded-md w-80' placeholder='+ Nova Refeição' />
                <button type="submit" className='bg-green-500 text-white rounded-xl p-2 w-80 h-14' onClick={
                    () => {
                        add_item(items[0].type)
                    }
                }>Cadastrar</button>
                <div className={"alreadyRegister gap-4 flex flex-col-reverse py-6 justify-start " + items[0].type}>
                    {
                        items.map(item => {
                            return (
                                <RecipeDelete key={item.id} item={item} />
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}

export default RecipeItemRegister
