import React from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

interface PasswordInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ value, onChange, error }) => {
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
        type="password"
        name="password"
        value={value}
        onChange={onChange}
        className={`w-1/1.5 bg-transparent outline-none h-14 passwordInput ${error ? 'border-red-500' : ''}`}
        placeholder="Senha"
      />
      <i className="flex items-center justify-center cursor-pointer">
        <FontAwesomeIcon icon={faEye} id="eyeIcon" className="p-4 w-full" onClick={switchPasswordVisibility} />
      </i>
    </div>
  );
};

export default PasswordInput;