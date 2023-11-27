import React from 'react'
import './style.css'
import Image from 'next/image'


const FloatTitle = ({ title }: { title: string }) => {
    return (
        <div className='cardTitle absolute bottom-0 left-0 px-2 py-8 bg-slate-300 w-100 z-0 opacity-70'>
            <p className='cardTitleText text-xl opacity-100 z-50'>{title}</p>
        </div>
    )
}

export default FloatTitle