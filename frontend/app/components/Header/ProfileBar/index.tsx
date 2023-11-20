import React from 'react'
import Image from 'next/image'

const ProfileBar = () => {
  return (
    <div className='items-center flex justify-center overflow-hidden'>
        <a href="login" className='items-center justify-center mx-6'>Entrar/Cadastar</a>
        <Image src="/logo.png" alt="Logo" width={241} height={202.24} className='w-100 h-100 mix-blend-screen' />
    </div>
  )
}

export default ProfileBar