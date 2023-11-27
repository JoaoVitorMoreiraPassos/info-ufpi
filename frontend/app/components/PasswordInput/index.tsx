'use client'
import React from 'react'
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'

const PasswordInput = () => {

  const switch_password_visibility = () => {
    const eyeIcon = document.getElementById('eyeIcon') as HTMLElement;
    const passwordInput = document.getElementById('passwordInput') as HTMLInputElement;
    if (passwordInput === null) {
      return;
    }
    if (passwordInput.getAttribute('type') == 'password') {
      passwordInput.setAttribute('type', 'text');
    }
  }

  return (
    <div className='passwordContainer flex flex-row w-full'>
      <input id="passwordInput" type="password" name="password" className=' w-1/1.5 bg-transparent outline-none h-14 passwordInput' placeholder='senha' />
      <i className='flex items-center justify-center cursor-pointer'>
        <FontAwesomeIcon icon={faEye} id='eyeIcon' className=' p-4 w-full' onClick={switch_password_visibility} />
      </i>
    </div>
  )
}

export default PasswordInput
