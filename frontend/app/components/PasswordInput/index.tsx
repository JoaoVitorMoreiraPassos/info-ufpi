'use client';
import React, { useEffect } from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

interface PasswordInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ value, onChange, error, placeholder }: { value: string, onChange: (event: React.ChangeEvent<HTMLInputElement>) => void, error?: string, placeholder?: string | undefined }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [inputType, setInputType] = useState('password');
  const [eyeIcon, setEyeIcon] = useState(faEye);


  useEffect(() => {
    if (passwordVisible) {
      setInputType('text');
      setEyeIcon(faEyeSlash);
    } else {
      setInputType('password');
      setEyeIcon(faEye);
    }
  }, [passwordVisible]);

  const switchPasswordVisibility = () => {
    const passwordInput = document.getElementById('passwordInput') as HTMLInputElement;

    if (passwordInput) {
      const currentType = passwordInput.getAttribute('type');
      passwordInput.setAttribute('type', currentType === 'password' ? 'text' : 'password');
    }
  };

  return (
    <div className={`passwordContainer flex flex-row w-full ${error ? 'border-red-500' : ''}`}>
      <input
        id="passwordInput"
        type={inputType}
        name="password"
        value={value}
        onChange={onChange}
        className={`w-1/1.5 bg-transparent outline-none h-14 text-black passwordInput ${error ? 'border-red-500' : ''}`}
        placeholder={placeholder ? placeholder : 'Senha'}
      />
      <i className="flex items-center justify-center cursor-pointer">
        <FontAwesomeIcon icon={eyeIcon} id="eyeIcon" className="p-4 w-full" onClick={() => setPasswordVisible((isVisible) => !isVisible)} />
      </i>
    </div>
  );
};

export default PasswordInput;