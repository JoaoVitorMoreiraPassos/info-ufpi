'use client'
import React from 'react'

const ImageInput = () => {
    return (
        <div className="flex flex-col w-1/2 gap-4 items-end">
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
                        fileInput.files = e.dataTransfer.files
                    }
                }}>
                <span className="drop-title">Arraste a Image aqui<br /></span>
                ou
                <input type="file" name="image" id="image" className=' w-full flex justify-center items-center text-center' placeholder='Arrate uma imagem até aqui' />

            </label>
        </div>
    )
}

export default ImageInput
