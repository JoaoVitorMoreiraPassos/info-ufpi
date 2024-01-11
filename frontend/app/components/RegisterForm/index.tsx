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
    const [email, setEmail] = useState('');
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
        if (!email) {
            document.getElementById('email')?.focus();
            toast.warning('Por favor, insira seu e-mail.');
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
                "first_name": firstName,
                "last_name": lastName,
                "username": username,
                "email": email,
                "password": password
            }

            await axios.post('http://localhost:8000/cadastrar/', data)
                .then((response) => {
                    if (response.status === 201) {
                        toast.success("Usuário cadastrado com sucesso!")
                        const token = response.data.token;
                        const user = response.data.user;
                        localStorage.setItem('token', token);
                        localStorage.setItem('user', JSON.stringify(user));
                        window.location.href = '/';
                    }
                })
                .catch((error) => {
                    if (error.response.status == 400) {
                        toast.error("Erro ao cadastrar usuário!");
                    }
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

            <input
                className={`rounded-lg ${usernameError ? 'border-red-500' : ''}`}
                type="email"
                name="email"
                id="email"
                placeholder="E-mail ou telefone"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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