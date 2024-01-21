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
    <div>
      <div className=' profile items-center justify-center overflow-hidden'>
        {username ? (
          <Link href="/perfil" className='items-center justify-center mx-6 ' onMouseOver={() => {
            let usernameFloat = document.querySelector('.usernameFloat');
            if (usernameFloat) {
              usernameFloat.classList.remove('hidden');
            }
          }} onMouseLeave={() => {
            let usernameFloat = document.querySelector('.usernameFloat');
            if (usernameFloat) {
              usernameFloat.classList.add('hidden');
            }
          }}>
            <div className='flex items-center justify-center'>
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
          </Link>
        ) : (
          <Link href="/autenticacao/login" className='items-center justify-center mx-6'>{
            'Entrar/Cadastrar'
          }</Link>
        )}
        <div className='usernameFloat hidden absolute top-20 transition-all right-4 bg-slate-100 text-slate-600 p-2 rounded-lg h-10 z-50'>
          <p className='text-sm'>@{username}</p>
        </div>
      </div>

      <div className='profileMob flex-row justify-center items-center w-full h-16 rounded-xl relative'>
        <div className='items-center flex justify-center overflow-hidden absolute mr-16'>
          <Link href="/" className='flex items-center justify-center cursor-pointer'>
            <Image src="/logo.png" alt="Logo" width={80} height={80} className='w-auto h-full mix-blend-screen' />
          </Link>
        </div>
        {username ? (
          <Link href="/perfil" className='items-center justify-center mx-6 absolute right-0'>
            <div className='flex items-center justify-center' onMouseUp={() => {
              let usernameFloat = document.querySelector('.usernameFloat');
              if (usernameFloat) {
                usernameFloat.classList.remove('hidden');
              }
            }}
              onMouseLeave={() => {
                let usernameFloat = document.querySelector('.usernameFloat');
                if (usernameFloat) {
                  usernameFloat.classList.add('hidden');
                }
              }}
            >
              {
                user_image === null ? (
                  <div className='flex flex-col gap-1 items-center justify-center'>
                    <FontAwesomeIcon icon={faUser} className=' text-slate-100 h-6 w-6 bg-slate-300 p-2 rounded-full' />
                    {/* <p className=' text-sm '>@{username}</p> */}
                  </div>
                ) : (
                  <Image src={user_image} alt={username} width={50} height={50} className=' w-10 h-10 rounded-full aspect-square' />
                )
              }
            </div>
          </Link>
        ) : (
          <Link href="/autenticacao/login" className='items-center  justify-end mx-6 ml-auto absolute right-0'>
            <FontAwesomeIcon icon={faUser} />
          </Link>)}
      </div >
    </div>
  )
}

export default ProfileBar;