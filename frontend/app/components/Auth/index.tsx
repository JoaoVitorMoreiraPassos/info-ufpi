'use client';
import React from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export const Auth = () => {
    const [admin, setAdmin] = React.useState(false);
    const [islogged, setIslogged] = React.useState(false);
    const [token, setToken] = React.useState('');

    let getUser = async () => {
        await axios.get('http://localhost:8000/usuario/' + token)
            .then((response) => {
                if (response.data.status === 'success') {
                    let user = response.data.user
                    if (user.isAdmin) {
                        setAdmin(true);
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    React.useEffect(() => {
        setToken(localStorage.getItem('token') || '');
        if (token) {
            setIslogged(true);
        }
        if (islogged) {
            getUser();
        }
    }, []);

    return (
        <>

            {
                admin ? (
                    <div onClick={() => {
                        window.location.href = '/admin/cadastrar/noticia/';
                    }} className='cursor-pointer fixed bottom-2 right-2 h-14 w-14 rounded-full bg-blue-500 flex justify-center items-center'>
                        <FontAwesomeIcon icon={faPlus} className=' text-white w-3/4 h-3/4' />
                    </div>
                ) : (
                    <></>
                )
            }

        </>
    )
}
