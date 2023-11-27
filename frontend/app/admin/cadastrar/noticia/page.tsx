'use client'
import SideBar from '@/app/components/SideBar'
import HomeContent from '@/app/components/MainContent/HomeContent'
import '@/app/globals.css'
import Header from '@/app/components/Header'
import './style.css'


export default function CadastrarNoticia() {
    return (
        <main className="flex flex-row justify-start" >
            <SideBar />
            <div className='mainContainer border-l'>
                <Header />
                <div>
                    <form action="" className='flex-col flex p-16 items-end w-full gap-10'>
                        <div className='flex flex-row w-full gap-24'>
                            <section className="flex flex-col w-1/2 gap-6">
                                <p>Cadastrar Notícia</p>
                                <input type="text" placeholder='Titulo *' className=' h-14 w-full' />
                                <textarea name="description" cols={30} rows={10} placeholder='Descrição *' className=' h-96'></textarea>
                            </section>
                            <section className="flex flex-col w-1/2 gap-4 items-end">
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
                            </section>
                        </div>
                        <button className='bg-green-500 text-white h-14 w-1/3 rounded-xl'>Cadastrar</button>
                    </form>
                </div>
            </div>
        </main>
    )
}