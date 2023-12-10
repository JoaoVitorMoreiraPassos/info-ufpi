'use client'
import React, { useState } from 'react'
import PasswordInput from '@/app/components/PasswordInput'

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault();

        // Limpar mensagens de erro
        setUsernameError('');
        setPasswordError('');

        // Validar campos
        if (!username) {
            document.getElementById('username')?.focus();
            setUsernameError('Por favor, insira seu e-mail ou telefone.');
            return;
        }

        if (!username.includes('@') || !username.includes('.')) {
            document.getElementById('username')?.focus();
            setUsernameError('Por favor, insira um e-mail ou telefone válido.');
            return;
        }

        if (!password) {
            document.getElementById('passwordInput')?.focus();
            setPasswordError('Por favor, insira sua senha.');
            return;
        }
    }

    return (
        <form className='flex flex-col p-6 gap-6 w-1/1 items-center'>
            <input
                className={`rounded-lg ${usernameError ? 'border-red-500' : ''}`}
                type="email"
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
                onClick={handleSubmit}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-40"
            >
                Entrar
            </button>
        </form>
    );
}

export default LoginForm;