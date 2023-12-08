'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const ProfileBar = () => {

  const [screenWidth, setScreenWidth] = useState<number>(0);
  const [screenHeight, setScreenHeight] = useState<number>(0);

  React.useEffect(() => {
    setScreenWidth(window.innerWidth);
    setScreenHeight(window.innerHeight);
  }, []);

  React.useEffect(() => {
    window.addEventListener("resize", () => {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    });
  }, []);

  return (
    <>
      {
        screenWidth > 1024 && (
          <div className='items-center flex justify-center overflow-hidden'>
            <Link href="/autenticacao/login" className='items-center justify-center mx-6'>Entrar/Cadastar</Link>
            <Link href="/" className='flex items-center justify-center cursor-pointer'>
              <Image src="/logo.png" alt="Logo" width={241} height={202.24} className='w-100 h-100 mix-blend-screen' />
            </Link>
          </div>
        )

      }
      {
        screenWidth <= 1024 && (
          <div className='flex flex-row justify-center items-center w-full h-16 rounded-xl relative'>
            <div className='items-center flex justify-center overflow-hidden absolute mr-12'>
              <Link href="/" className='flex items-center justify-center cursor-pointer'>
                <Image src="/logo.png" alt="Logo" width={241} height={202.24} className='w-100 h-100 mix-blend-screen' />
              </Link>
            </div>
            <Link href="/autenticacao/login" className='items-center  justify-end mx-6 ml-auto absolute right-0'>
              <FontAwesomeIcon icon={faUser} />
            </Link>
          </div>

        )
      }
    </>
  )
}

export default ProfileBar