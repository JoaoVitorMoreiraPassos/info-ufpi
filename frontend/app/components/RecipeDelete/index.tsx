'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import api from '@/app/api/ru'
interface Item {
    id: number,
    nome_refeicao: string,
    tipo_refeicao: string
}

const RecipeDelete: React.FC<{ item: Item }> = ({ item }) => {

    const deleteItem = async () => {

        const response = await api.deleteAlimento(item.id);

        const node = document.querySelector(`#${item.tipo_refeicao}${item.id}`)
        if (node) {
            if (node.parentNode) {
                node.parentNode.removeChild(node);
            }
        }
    }

    return (
        <div key={item.id} id={item.tipo_refeicao + item.id} className='flex flex-row justify-between items-center w-80  border-b-2 border-solid p-1' >
            <p>{item.nome_refeicao}</p>
            <button className=' text-red-500 rounded-xl p-2 text-xl flex items-center justify-center' onClick={
                () => {
                    deleteItem()
                }
            }><i><FontAwesomeIcon icon={faTrash} /></i></button>
        </div >
    )
}

export default RecipeDelete

