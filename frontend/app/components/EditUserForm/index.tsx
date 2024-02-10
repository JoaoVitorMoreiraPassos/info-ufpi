'use client'
import React from 'react'
import { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import UserApi from '@/app/api/user'
import './style.css'

export const EditUserForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState<File>();
    const [imageError, setImageError] = useState(false);
    const [preview, setPreview] = useState('');
    const [usernameError, setUsernameError] = useState('');

    useEffect(() => {
        const getUser = async () => {
            if (!localStorage.getItem('access') || !localStorage.getItem('refresh')) {
                window.location.href = '/autenticacao/login';
                return;
            }
            try {
                const response = await UserApi.GetLoggedUser();
                if (!response) window.location.href = '/autenticacao/login';
                if (response) {
                    setFirstName(response.first_name);
                    setLastName(response.last_name);
                    setUsername(response.username);
                    setEmail(response.email);
                    setPreview(response.foto_perfil);
                }
            } catch {
                window.location.href = '/autenticacao/login';
            }
        }
        getUser();
    }, []);


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
        return flag;
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (isValid()) {
            try {
                const response = await UserApi.UpdateUser(firstName, lastName, username, email, image);
                if (!response) return;

                if (response.status === 200) {
                    toast.success('Atualização efetuada com sucesso!')

                    setTimeout(() => {
                        window.location.href = '/perfil';
                    }, 1000);
                }
            } catch (error: any) {
                if (error.response.status === 404) {
                    toast.error('Usuário ou senha incorretos.')
                }
                else {
                    toast.error('Erro ao efetuar login.')
                }
            }
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col p-6 gap-6 w-1/1 items-center">
            <ToastContainer />
            <div className="flex flex-col w-96 max-[425px]:w-64 gap-4 justify-end items-start h-full">
                <p className=' w-full text-left'>Imagem de Perfil</p>
                <label htmlFor="image" className="drop-container h-full w-full flex justify-center items-center" id="dropcontainer"
                    onDragOver={
                        (e) => {
                            e.preventDefault();
                        }
                    }
                    onDragEnter={() => {
                        let dropcontainer = document.querySelector('.dropcontainer')
                        if (dropcontainer) {
                            dropcontainer.classList.add("drag-active")
                        }
                    }}
                    onDragLeave={() => {
                        let dropcontainer = document.querySelector('.dropcontainer')
                        if (dropcontainer) {
                            dropcontainer.classList.remove("drag-active")
                        }
                    }}
                    onDrop={(e) => {
                        let dropContainer = document.querySelector('.dropcontainer');
                        let fileInput = document.querySelector('#image') as HTMLInputElement;

                        e.preventDefault()
                        if (dropContainer) {
                            dropContainer.classList.remove("drag-active")

                        }
                        if (fileInput) {
                            fileInput.files = e.dataTransfer.files;
                            setImage(fileInput.files[0]);
                            setPreview(URL.createObjectURL(fileInput.files[0]));
                            setImageError(false);
                        }
                    }}
                >
                    <span className="drop-title">Arraste a imagem aqui<br /></span>
                    ou
                    <input type="file" name="image" id="image" className=' w-full flex justify-center items-center text-center' placeholder='Arrate uma imagem até aqui'
                        onChange={(e) => setImage(e.target.files?.[0])}
                    />
                    {imageError && <p className="text-red-500">Por favor, insira uma imagem.</p>}

                </label>
            </div>
            <div className="flex flex-col gap-4 justify-center w-96 max-[425px]:w-64 items-start h-full">
                <label htmlFor="first_name" className='w-full'>
                    <p className='pl-3'>
                        Primeiro Nome:
                    </p>
                    <input
                        className={`rounded-lg w-full ${usernameError ? 'border-red-500' : ''}`}
                        type="text"
                        name="first_name"
                        id="first_name"
                        placeholder="Primeiro Nome"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </label>
                <label htmlFor="last_name" className='w-full'>
                    <p className='pl-3'>
                        Sobrenome:
                    </p>
                    <input
                        className={`rounded-lg w-full ${usernameError ? 'border-red-500' : ''}`}
                        type="text"
                        name="last_name"
                        id="last_name"
                        placeholder="Sobrenome"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </label>
                <label htmlFor="username" className='w-full'>
                    <p className='pl-3'>
                        Nome de usuário:
                    </p>
                    <input
                        className={`rounded-lg w-full ${usernameError ? 'border-red-500' : ''}`}
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Nome de usuário"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <label htmlFor="email" className='w-full'>
                    <p className='pl-3'>
                        email:
                    </p>
                    <input
                        className={`rounded-lg w-full ${usernameError ? 'border-red-500' : ''}`}
                        type="email"
                        name="email"
                        id="email"
                        placeholder="E-mail ou telefone"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
            </div>


            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-40"
            >
                Atualizar
            </button>
        </form>
    );
}
