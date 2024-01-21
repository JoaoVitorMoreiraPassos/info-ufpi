'use client';
import React from 'react';
import ImageInput from '@/app/components/ImageInput';
import { useState, useEffect } from 'react';
import UserApi from '@/app/api/user';
import PostApi from '@/app/api/post';

const NoticeForm = () => {


    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState<File>();

    const [titleError, setTitleError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [preview, setPreview] = useState('');


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        if (name === 'title') {
            setTitle(value);
            setTitleError(false);
        }
        if (name === 'description') {
            setDescription(value);
            setDescriptionError(false);
        }


    }

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        let errorFlag = false;
        if (!title) {
            setTitleError(true);
            errorFlag = true;
        }

        if (!description) {
            setDescriptionError(true);
            errorFlag = true;
        }

        if (!image) {
            setImageError(true);
            errorFlag = true;
        }

        if (errorFlag) {
            event.preventDefault();
            return;
        }

        event.preventDefault();

        try {
            const response = await PostApi.CreatePost(title, description, image)
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <div>
            <form className='flex-col flex p-16 items-end w-full gap-10'
                onSubmit={onSubmit}
            >
                <div className='flex flex-row w-full gap-24 flex-wrap items-start justify-center'>
                    <section className="flex flex-col w-96 gap-6">
                        <p>Cadastrar Notícia</p>
                        <input type="text" placeholder='Titulo *' className=' h-14 w-full' name="title" onChange={handleInputChange} />
                        {titleError && <p className="text-red-500">Por favor, insira um título.</p>}
                        <textarea name="description" cols={30} rows={10} placeholder='Descrição *' className=' h-96' onChange={handleInputChange}></textarea>
                        {descriptionError && <p className="text-red-500">Por favor, insira uma descrição.</p>}
                    </section>
                    <div className="flex flex-col w-96 gap-4 justify-end items-start h-full">
                        <p className=' w-full text-left'>Imagem</p>
                        <label htmlFor="image" className="drop-container h-full w-full flex justify-center items-center" id="dropcontainer"
                            onDragOver={
                                (e) => {
                                    e.preventDefault();
                                }
                            }
                            onDragEnter={() => {
                                let dropcontainer = document.querySelector('.dropcontainer')
                                if (dropcontainer) {
                                    dropcontainer.classList.add("drag-active")
                                }
                            }}
                            onDragLeave={() => {
                                let dropcontainer = document.querySelector('.dropcontainer')
                                if (dropcontainer) {
                                    dropcontainer.classList.remove("drag-active")
                                }
                            }}
                            onDrop={(e) => {
                                let dropContainer = document.querySelector('.dropcontainer');
                                let fileInput = document.querySelector('#image') as HTMLInputElement;

                                e.preventDefault()
                                if (dropContainer) {
                                    dropContainer.classList.remove("drag-active")

                                }
                                if (fileInput) {
                                    fileInput.files = e.dataTransfer.files;
                                    setImage(fileInput.files[0]);
                                    setPreview(URL.createObjectURL(fileInput.files[0]));
                                    setImageError(false);
                                    console.log(fileInput.files[0]);
                                }
                            }}
                        >
                            <span className="drop-title">Arraste a Image aqui<br /></span>
                            ou
                            <input type="file" name="image" id="image" className=' w-full flex justify-center items-center text-center' placeholder='Arrate uma imagem até aqui'
                                onChange={(e) => setImage(e.target.files?.[0])}
                            />
                            {imageError && <p className="text-red-500">Por favor, insira uma imagem.</p>}

                        </label>
                    </div>
                </div>
                <button className='bg-green-500 text-white h-14 w-1/3 rounded-xl'
                    type='submit'
                >Cadastrar</button>
            </form>
        </div>
    )
}

export default NoticeForm
