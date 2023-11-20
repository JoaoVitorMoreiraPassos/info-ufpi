'use client'
import React from 'react'
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'

const PasswordInput = () => {
  return (
    <div className='passwordContainer flex flex-row rounded-lg w-full'>
      <input id="passwordInput" type="password" name="password" className=' w-1/1.5 bg-transparent outline-none passwordInput' placeholder='senha'/>
        <i className='flex items-center justify-center p-2 cursor-pointer' onClick={
            () => {
                    const eyeIcon = document.getElementById('eyeIcon');
                    const passwordInput = document.getElementById('passwordInput') ?? null;
                    if (passwordInput === null) {
                        return;
                    }
                    if (passwordInput.getAttribute('type') === 'password') {
                        passwordInput.setAttribute('type', 'text');
                        eyeIcon?.classList.add('text-cyan-600');
                    } else {
                        passwordInput.setAttribute('type', 'password');
                        eyeIcon?.classList.remove('text-cyan-600');
                    }
            }
        }>
            <FontAwesomeIcon icon={faEye} id='eyeIcon'/>
        </i>
    </div>
  )
}

export default PasswordInput
