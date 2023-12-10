import React from 'react'
import './style.css'
import Link from 'next/link'

const RecentNotice = ({ description }: { description: string }) => {
    return (
        <div className='recentNotice max-w-full  cursor-pointer my-4 h-auto p-2 flex items-center'>
            <Link href="#" className=' underline flex items-center p-4'>
                {description}
            </Link>
        </div>
    )
}

export default RecentNotice 