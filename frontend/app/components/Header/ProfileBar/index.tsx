'use client';
import './style.css'
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import UserApi from '@/app/api/user'
import { useState, useEffect } from 'react';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Profile {
  id: number,
  first_name: string,
  last_name: string,
  username: string,
  email: string,
  foto_perfil: string,
  post_permissoes: boolean,
}
const ProfileBar = () => {
  const [username, setUser] = useState<string>("");
  const [user_image, setUserImage] = useState<string>("")
  const [floatProfileActive, setFloatProfileActive] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener('click', (event) => {
      if (event.target === document.querySelector('.usernameFloat')) {
        setFloatProfileActive(false);
      }
    })
  }, [])

  useEffect(() => {
    const getLoggedUser = async () => {
      if (!localStorage.getItem('access')) return;
      if (!localStorage.getItem('refresh')) return;
      try {
        const response: Profile | undefined = await UserApi.GetLoggedUser();
        if (response) {
          setUser(response.username);
          setUserImage(response.foto_perfil);
        };
      }
      catch (error: any) {
        if (error.response.status === 401) {
          alert('Sua sessão expirou, faça login novamente');
          return;
        }
      }
    }
    getLoggedUser();
  }, [])
  return (
    <>
      <div className=' profile items-center justify-center overflow-hidden'>
        {username ? (
          <div className='items-center justify-center mx-6 ' onClick={() => (setFloatProfileActive((isActive) => !isActive))} >
            <div className='flex items-center justify-center cursor-pointer'>
              {
                user_image === null ? (
                  <div className='flex flex-col gap-1 items-center justify-center'>
                    <FontAwesomeIcon icon={faUser} className=' text-slate-100 h-6 w-6 bg-slate-300 p-2 rounded-full' />
                  </div>
                ) : (
                  <Image src={user_image} alt={username} width={50} height={50} className=' rounded-full aspect-square' />
                )
              }
            </div>
          </div>
        ) : (
          <Link href="/autenticacao/login" className='items-center justify-center mx-6'>{
            'Entrar/Cadastrar'
          }</Link>
        )}
        {floatProfileActive &&
          <div className='usernameFloat  absolute top-20 transition-all right-0 bg-blue-400 text-white  rounded-lg h-auto z-50'>
            <div className='text-sm flex items-center justify-center py-3  h-8 pt-6 pb-6 px-10'>
              <p className='w-full flex justify-center items-center'>@{username}</p>

            </div>
            <div className='text-sm flex items-center justify-center py-3 cursor-pointer  h-8 pt-6 pb-6 px-10 border-t border-b border-white'>

              <Link href={"/perfil/" + username} className='w-full flex justify-center items-center'>
                Perfil
              </Link>
            </div>
            <div className='text-sm flex items-center justify-center py-3 cursor-pointer  h-8 pt-6 pb-6 px-10'>

              <p className='w-full flex justify-center items-center' onClick={() => {
                localStorage.removeItem('access');
                localStorage.removeItem('refresh');
                window.location.href = '/';
              }}>Sair</p>
            </div>
          </div>}
      </div>

      <div className='profileMob flex-row justify-center items-center w-full h-16 rounded-xl relative'>
        <div className='items-center flex justify-center overflow-hidden absolute mr-16'>
          <Link href="/" className='flex items-center justify-center cursor-pointer'>
            <Image src="/logo.png" alt="Logo" width={80} height={80} className='w-auto h-full mix-blend-screen' />
          </Link>
        </div>
        {username ? (
          <div className='items-center justify-center mx-6 absolute right-0' onClick={() => (setFloatProfileActive((isActive) => !isActive))}>
            <div className='flex items-center justify-center' >
              {
                user_image === null &&
                <div className='flex flex-col gap-1 items-center justify-center'>
                  <FontAwesomeIcon icon={faUser} className=' text-slate-100 h-6 w-6 bg-slate-300 p-2 rounded-full' />
                </div>
              }
              {
                user_image !== null &&
                <Image src={user_image} alt={username} width={40} height={40} className=' rounded-full aspect-square' />
              }
            </div>
          </div>
        ) : (
          <Link href="/autenticacao/login" className='items-center  justify-end mx-6 ml-auto absolute right-0'>
            <FontAwesomeIcon icon={faUser} />
          </Link>)}

        {floatProfileActive &&
          <div className='usernameFloat  absolute top-16 right-0 bg-blue-400 text-white rounded-lg  z-50'>
            <div className='text-sm flex items-center justify-center py-3 h-8 pt-6 pb-6 px-10'>
              <p className='w-full flex justify-center items-center'>@{username}</p>

            </div>
            <div className='text-sm flex items-center justify-center py-3 h-8 pt-6 pb-6 px-10 border-t border-b border-white'>

              <Link href={"/perfil/" + username} className='w-full flex justify-center items-center'>
                Perfil
              </Link>
            </div>
            <div className='text-sm flex items-center justify-center py-3 h-8 pt-6 pb-6 px-10'>

              <p className='w-full flex justify-center items-center' onClick={() => {
                localStorage.removeItem('access');
                localStorage.removeItem('refresh');
                window.location.href = '/';
              }}>Sair</p>
            </div>
          </div>}
      </div >
    </>
  )
}

export default ProfileBar;