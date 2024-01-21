'use client';
import React from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import UserApi from '@/app/api/user';
import { create } from 'domain';
import Link from 'next/link';

export const Auth = () => {
    const [createPost, setCreatePosts] = React.useState(false);
    const [createRefs, setCreateRefs] = React.useState(false);
    const [floatIsOpen, setFloatIsOpen] = React.useState(false);

    React.useEffect(() => {
        let getUser = async () => {
            const user = await UserApi.GetLoggedUser();
            if (user) {
                setCreatePosts(user.post_permissoes);
            }
            if (user) {
                setCreateRefs(user.refeicao_permissoes);
            }
        }
        getUser();
    }, []);

    return (
        <div>

            {
                createPost || createRefs ? (
                    <div onClick={() => setFloatIsOpen((estado) => !estado)} className='cursor-pointer fixed bottom-2 right-2 h-14 w-14 rounded-full bg-blue-500 flex justify-center items-center'>
                        <FontAwesomeIcon icon={faPlus} className=' text-white w-3/4 h-3/4' />
                    </div>
                ) : (
                    <></>
                )
            }
            {
                floatIsOpen && (
                    <div onClick={() => {
                        setFloatIsOpen(false);
                    }} className='fixed bottom-0 right-2 h-auto w-40 bg-blue-500 flex flex-col justify-center text-white rounded-xl transition-all duration-500 -translate-y-20'>
                        {
                            createPost && (
                                <div className='cursor-pointer bottom-8 right-2 h-10 w-full bg-blue-500 flex justify-center items-center rounded-xl'>
                                    <Link href='/admin/cadastrar/noticia/'>
                                        Nova Noticia
                                    </Link>
                                </div>
                            )}

                        {
                            createRefs && (
                                <div>

                                    <div className='cursor-pointer bottom-8 right-2 h-10 w-full bg-blue-500 flex justify-center items-center border-b border-b-white  border-t '>
                                        <Link href='/admin/restaurante/cadastrar/cardapio/'>
                                            Novo Cardapio
                                        </Link>
                                    </div>
                                    <div className='cursor-pointer bottom-8 right-2 h-10 w-full bg-blue-500 flex justify-center items-center rounded-xl'>
                                        <Link href='/admin/restaurante/cadastrar/refeicao/'>
                                            Nova Refeição
                                        </Link>
                                    </div>
                                </div>

                            )
                        }
                    </div>
                )
            }
        </div>
    )
}
