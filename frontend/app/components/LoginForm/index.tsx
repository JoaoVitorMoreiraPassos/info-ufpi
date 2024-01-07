'use client'
import React, { useState } from 'react'
import PasswordInput from '@/app/components/PasswordInput'

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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

        if (!password) {
            document.getElementById('passwordInput')?.focus();
            setPasswordError('Por favor, insira sua senha.');
            return;
        }

        let data = {
            username,
            password
        }

        let url = 'http://localhost:8000/login/'

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',

            },
            mode: 'cors'
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.status === 'success') {
                    console.log("deu certo")
                    let token = data.token
                    let user = data.user
                    localStorage.setItem('token', token)
                    localStorage.setItem('user', JSON.stringify(user))
                    window.location.href = '/'
                }
                else if (data.status === 'error') {
                    setUsernameError(data.message)
                }
                else if (data.detail === "Não encontrado.") {
                    setUsernameError('Usuário não encontrado.')
                }
            })

            .catch((error) => {
                console.log(error)
            });

    }

    return (
        <form className='flex flex-col p-6 gap-6 w-1/1 items-center' onSubmit={handleSubmit}>
            <input
                className={`rounded-lg ${usernameError ? 'border-red-500' : ''}`}
                type="text"
                name="username"
                id="username"
                placeholder="Usuário"
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
            >
                Entrar
            </button>
        </form>
    );
}

export default LoginForm;