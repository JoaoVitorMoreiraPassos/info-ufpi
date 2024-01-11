'use client';
import React, { useState } from 'react';
import PasswordInput from '@/app/components/PasswordInput';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const RegisterForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const isValid = () => {
        let flag = true;

        // Validar campos
        if (!firstName) {
            document.getElementById('first_name')?.focus();
            toast.warning('Por favor, insira seu primeiro nome.');
            flag = false;
        }

        if (!lastName) {
            document.getElementById('last_name')?.focus();
            toast.warning('Por favor, insira seu sobrenome.');
            flag = false;
        }

        if (!username) {
            document.getElementById('username')?.focus();
            toast.warning('Por favor, insira seu e-mail ou telefone.');
            flag = false;
        }

        if (!password) {
            document.getElementById('passwordInput')?.focus();
            toast.warning('Por favor, insira sua senha.')
            flag = false;
        }
        return flag;
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (isValid()) {

            const data = {
                firstName,
                lastName,
                username,
                password
            }

            await axios.post('http://localhost:8000/cadastrar/', data)
                .then((response) => {
                    if (response.status === 200) {
                        const token = response.data.token
                        localStorage.setItem('token', token)
                        window.location.href = '/'
                    }
                })
                .catch((error) => {
                    toast.error(error.response.data.message);
                })
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col p-6 gap-6 w-1/1 items-center">
            <ToastContainer />
            <div className="flex flex-row gap-1 justify-between w-full">
                <input
                    className={`rounded-lg ${usernameError ? 'border-red-500' : ''}`}
                    type="text"
                    name="first_name"
                    id="first_name"
                    placeholder="Primeiro Nome"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />

                <input
                    className={`rounded-lg ${usernameError ? 'border-red-500' : ''}`}
                    type="text"
                    name="last_name"
                    id="last_name"
                    placeholder="Sobrenome"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </div>

            <input
                className={`rounded-lg ${usernameError ? 'border-red-500' : ''}`}
                type="text"
                name="username"
                id="username"
                placeholder="E-mail ou telefone"
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
                Cadastrar
            </button>
        </form>
    );
};

export default RegisterForm;