import React from 'react'
import './style.css'
import Image from 'next/image'
import FloatTitle from './FloatTitle'

interface Noticia {
    "title": string
    "image": string
}
const NoticeCard = ({ noticia }: { noticia: Noticia }) => {
    return (
        <div className=' cardBody card-body w-90 h-64 relative max-w-sm ' >
            <a href="#">
                <Image src={noticia.image} alt="Logo" width={304} height={303.67} className='w-100 h-100 mix-blend-screen z-0' />
                <FloatTitle title={noticia.title} />
            </a>
        </div >
    )
}

export default NoticeCard
