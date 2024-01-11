'use client'
import React, { useState } from 'react'
import PasswordInput from '@/app/components/PasswordInput'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
// npm


const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const isValid = () => {
        let flag = true;

        // Validar campos
        if (!username) {
            document.getElementById('username')?.focus();
            toast.warning('Por favor, insira seu e-mail ou telefone.')
            flag = false;
        }

        if (!password) {
            document.getElementById('passwordInput')?.focus();
            toast.warning('Por favor, insira sua senha.')
            flag = false;
        }

        return flag;
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (isValid()) {

            const data = {
                username,
                password
            }

            await axios.post('http://localhost:8000/login/', data)
                .then((response) => {
                    if (response.status == 200) {
                        const token = response.data.token
                        localStorage.setItem('token', token)

                        toast.success('Login realizado com sucesso!')
                        setTimeout(() => {
                            window.location.href = '/'
                        }, 1000)
                    }

                })
                .catch((error) => {
                    toast.error(error.response?.data?.message ? error.response.data.message : 'Usuário não encontrado!')
                })
        }
    }

    return (
        <>
            <form className='flex flex-col p-6 gap-6 w-1/1 items-center' onSubmit={handleSubmit}>
                <ToastContainer />
                <input
                    className={`rounded-lg ${usernameError ? 'border-red-500' : ''}`}
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Usuário"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <PasswordInput
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={passwordError}

                />
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-40"
                >
                    Entrar
                </button>
            </form>
        </>
    );
}

export default LoginForm;