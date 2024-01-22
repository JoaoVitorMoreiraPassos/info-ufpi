'use client';
import React, { useState } from 'react';
import PasswordInput from '@/app/components/PasswordInput';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import UserApi from '@/app/api/user';

const NewPassordForm = ({ uid, token }: { uid: string, token: string }) => {
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const isValid = () => {
        let flag = true;

        // Validar campos
        if (!password1) {
            document.getElementById('passwordInput')?.focus();
            toast.warning('Por favor, insira sua senha.')
            flag = false;
        }

        if (!password2) {
            document.getElementById('passwordInput')?.focus();
            toast.warning('Por favor, insira sua senha.')
            flag = false;
        }

        if (password1 !== password2) {
            document.getElementById('passwordInput')?.focus();
            toast.warning('As senhas não coincidem.')
            flag = false;
        }
        return flag;
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (isValid()) {
            try {
                await UserApi.resetarSenha(password1, password2, uid, token);
                toast.success('Cadastro efetuado com sucesso!')
                setTimeout(() => {
                    window.location.href = '/autenticacao/login';
                }, 1000);
            } catch (error: any) {
                if (error.response.data.new_password[0]) {
                    toast.error(error.response.data.new_password[0])
                }
                if (error.response.data.new_password[1]) {
                    toast.error(error.response.data.new_password[1])
                }
            }
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col p-6 gap-6 w-1/1 items-center">
            <ToastContainer />

            <div className='w-full flex flex-col gap-6'>

                <PasswordInput
                    value={password1}
                    onChange={(e) => setPassword1(e.target.value)}
                    error={passwordError}
                    placeholder='Nova senha'
                />

                <PasswordInput
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    error={passwordError}
                    placeholder='Confirmar senha'
                />
            </div>

            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-40"
            >
                Cadastrar
            </button>
        </form>
    );
};

export default NewPassordForm;