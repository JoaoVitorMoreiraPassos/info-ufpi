'use client';
import React from 'react';
import './style.css'

const ContactContent = () => {
    const [email, setEmail] = React.useState('');
    const [message, setMessage] = React.useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(email, message);
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }
    const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
    }

    return (
        <div className='w-full h-full flex flex-col justify-center items-center py-20'>
            <h1 className='text-4xl  md:w-2/3 lg:max-w-2xl max-md:text-2xl text-center'>
                Procurando ajuda? Entre em contato!
            </h1>
            <form onSubmit={handleSubmit} className=' md:w-2/3 flex flex-col gap-3 lg:max-w-2xl max-md:text-2xl text-center max-sm:w-full max-sm:p-2'>
                <input type="email" className='w-full' placeholder='E-mail *' onChange={handleEmailChange} />
                <textarea className='w-full resize-none h-80' placeholder='Mensagem *' onChange={handleMessageChange} />
                <div className='flex justify-end'>
                    <button
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 w-48 rounded-2xl'
                        type='submit'>Enviar</button>
                </div>
            </form>
        </div>
    )
}

export default ContactContent
