'use client'
import React from 'react';
import { useRouter } from 'next/router';
import '@/app/globals.css';
import '@/app/autenticacao/style.css'
import Image from 'next/image';
import NewPassordForm from '@/app/components/NewPasswordForm';

export default function Confimar() {
    const router = useRouter();
    const { slug } = router.query;

    return (
        <div className="flex justify-center items-center h-screen" >
            <div className='loginCardContainer border-l flex-column items-center justify-center rounded m-auto'>
                <div className=' flex items-center justify-center'>
                    <Image src={'/logo.png'} width={241} height={202.24} alt='logo' className='w-40 mix-blend-difference' />
                </div>
                {
                    slug &&
                    <NewPassordForm uid={slug[0] as string} token={slug[1] as string} />
                }
            </div>
        </div>
    )
}
