import ImageInput from '@/app/components/ImageInput'
import SideBar from '@/app/components/SideBar'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import { metadata } from '@/app/layout'
import '@/app/globals.css'
import './style.css'


const CadastrarNoticia = () => {
    metadata.title = 'Noticia'
    return (
        <div>
            <div className="flex flex-row justify-start" >
                <SideBar />
                <div className='mainContainer border-l'>
                    <Header page_index={-1} />
                    <main>
                        <form action="" className='flex-col flex p-16 items-end w-full gap-10'>
                            <div className='flex flex-row w-full gap-24'>
                                <section className="flex flex-col w-1/2 gap-6">
                                    <p>Cadastrar Notícia</p>
                                    <input type="text" placeholder='Titulo *' className=' h-14 w-full' />
                                    <textarea name="description" cols={30} rows={10} placeholder='Descrição *' className=' h-96'></textarea>
                                </section>
                                <ImageInput />
                            </div>
                            <button className='bg-green-500 text-white h-14 w-1/3 rounded-xl'>Cadastrar</button>
                        </form>
                    </main>
                </div>
            </div>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}

export default CadastrarNoticia;