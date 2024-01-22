'use client';
import './style.css';
import React from 'react';
import Image from 'next/image';
import UserApi from '@/app/api/user';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RecuperarSenha = () => {

    const [email, setEmail] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState('')
    const handleSubmit = async (e: React.FormEvent) => {
        if (!email) {
            setError('Email não pode estar vazio!');

            return
        };
        e.preventDefault()
        setLoading(true)
        setError('')
        try {
            await UserApi.recuperarSenha(email)
            toast.success('Email enviado com sucesso!')
        } catch (error: any) {
            toast.error(error.response.data.message)
        }
        setLoading(false)
    }



    return (
        <main className='bg-white'>
            <ToastContainer />
            <div className="container mx-auto px-6 py-8 ">
                <div className="flex justify-center">
                    <div className="w-full xl:w-3/4 lg:w-11/12 flex flex-col items-center">
                        <Image className="w-40 h-auto lg:block bg-cover rounded-l-lg mix-blend-difference" src={'/logo.png'} width={241} height={202.24} alt='logo' />
                        <section className="w-full px-10 pt-6 pb-8 mb-4 bg-white rounded">
                            <h3 className="pt-4 text-2xl text-center">Recuperar senha</h3>
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
                                    Email
                                </label>
                                <input value={email}
                                    className={
                                        error ?
                                            "error " + "w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            : "w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    } id="email" type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
                                {error && <p className="text-xs italic text-red-500">{error}</p>}
                            </div>
                            <div className="mb-6 text-center">
                                <button className="md:w-80 max-md:w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-xl hover:bg-blue-700 focus:outline-none focus:shadow-outline" onClick={handleSubmit}>
                                    Recuperar
                                </button>
                            </div>
                        </section>
                    </div>
                </div>
            </div>

        </main >
    )
}

export default RecuperarSenha