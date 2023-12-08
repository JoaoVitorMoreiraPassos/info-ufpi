'use client';
import React, { useState } from 'react';
import PasswordInput from '@/app/components/PasswordInput';

const RegisterForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault();

        // Limpar mensagens de erro
        setFirstNameError('');
        setLastNameError('');
        setUsernameError('');
        setPasswordError('');

        // Validar campos
        if (!firstName) {
            setFirstNameError('Por favor, insira seu primeiro nome.');
            return;
        }

        if (!lastName) {
            setLastNameError('Por favor, insira seu sobrenome.');
            return;
        }

        if (!username) {
            setUsernameError('Por favor, insira seu e-mail ou telefone.');
            return;
        }

        if (!password) {
            setPasswordError('Por favor, insira sua senha.');
            return;
        }

        // Se chegou até aqui, os campos estão preenchidos corretamente
        console.log(firstName, lastName, username, password);
    };

    return (
        <form action="post" className="flex flex-col p-6 gap-6 w-1/1 items-center">
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
            {firstNameError && <p className="text-red-500">{firstNameError}</p>}
            {lastNameError && <p className="text-red-500">{lastNameError}</p>}

            <input
                className={`rounded-lg ${usernameError ? 'border-red-500' : ''}`}
                type="text"
                name="username"
                id="username"
                placeholder="E-mail ou telefone"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            {usernameError && <p className="text-red-500">{usernameError}</p>}

            <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={passwordError}
            />

            {passwordError && <p className="text-red-500">{passwordError}</p>}

            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-40"
                onClick={handleSubmit}
            >
                Cadastrar
            </button>
        </form>
    );
};

export default RegisterForm;