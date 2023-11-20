import React from 'react'
import './style.css'

const RecentNotice = ({ description }: { description: string }) => {
    return (
        <div className='recentNotice max-w-full  cursor-pointer my-4 h-12 flex items-center'>
            <a href="#" className=' underline flex items-center p-4'>
                {description}
            </a>
        </div>
    )
}

export default RecentNotice 