import React from 'react'
import Image from 'next/image'

const NoticeCardPerfil = ({ notice_infos }: {
    notice_infos: {
        "author": string,
        "date": string,
        "description": string,
        "author_image": string,
        "recipe_image": string,
    }
}) => {
    const cardStyle = {
        fontFamily: 'Inria Serif',
        backgroundColor: '#4985ADCC',
        minWidth: '300px',
        width: '500px',
        color: 'white',
    }

    return (
        <div className=' card flex justify-center items-start p-4 gap-4 w-14' style={cardStyle}>
            <div className=' flex flex-row w-full gap-8 items-center justify-center '>
                <Image className='rounded-full flex justify-start w-14 h-14' width={1000} height={1000} src={notice_infos.author_image} alt='profile' />
                <div className=' w-full'>
                    <p className=' text-xl '>
                        {notice_infos.author}
                    </p>
                    <p className=' w-full'>
                        {notice_infos.date}
                    </p>
                </div>
            </div>
            <div className=' w-full px-4'>
                <Image className='rounded-xl w-full' width={1000} height={1000} src={notice_infos.recipe_image} alt='profile' />
            </div>
            <div className=' description'>
                <p className=' text-xl p-6'>
                    {notice_infos.description}
                </p>
            </div>
        </div>
    )
}

export default NoticeCardPerfil
