'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import React from 'react'

interface Item {
    id: number,
    name: string,
    type: string
}

const RecipeDelete: React.FC<{ item: Item }> = ({ item }) => {

    const deleteItem = () => {
        document.querySelector(`#${item.type + item.id}`)?.remove()
    }

    return (
        <div key={item.id} id={item.type + item.id} className='flex flex-row justify-between items-center w-80  border-b-2 border-solid p-1' >
            <p>{item.name}</p>
            <button className=' text-red-500 rounded-xl p-2 text-xl flex items-center justify-center' onClick={
                () => {
                    deleteItem()
                }
            }><i><FontAwesomeIcon icon={faTrash} /></i></button>
        </div >
    )
}

export default RecipeDelete
