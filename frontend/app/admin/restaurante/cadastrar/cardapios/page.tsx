'use client'
import SideBar from '@/app/components/SideBar'
import HomeContent from '@/app/components/MainContent/HomeContent'
import '@/app/globals.css'
import Header from '@/app/components/Header'


export default function CadastrarNoticia() {
    const alreadyRegister = [
        {
            id: 1,
            name: 'Arroz',
            type: 'normal-recipe'
        },
        {
            id: 2,
            name: 'Feijão',
            type: 'normal-recipe'
        },
        {
            id: 3,
            name: 'Macarrão',
            type: 'normal-recipe'
        },
        {
            id: 4,
            name: 'Salada',
            type: 'follow-up'
        },
        {
            id: 5,
            name: 'Batata Frita',
            type: 'follow-up'
        },
        {
            id: 6,
            name: 'Purê de Batata',
            type: 'follow-up'
        },
        {
            id: 7,
            name: 'Stronoff de Grão de Bico',
            type: 'veg-recipe'
        }
    ]
    return (
        <main className="flex flex-row justify-start" >
            <SideBar />
            <div className='mainContainer border-l'>
                <Header />
                <div className='flex-row flex p-14 justify-center gap-2'>
                    <section className='flex-col flex p-8 items-center gap-4 border-dashed border-2'>
                        <button type="submit" className='bg-green-500 text-white rounded-xl p-2 w-80 h-14'>Cadastrar</button>
                        <div className='flex flex-col'>
                            <label htmlFor="normal-recipe" className='text-xl'>Cadastrar Refeição</label>
                            <input type="text" name="normal-recipe" id="normal-recipe" className='border border-gray-400 rounded-md w-80' placeholder='+ Nova Refeição' />
                            <div className="alreadyRegister gap-4 flex flex-col py-6">
                                {
                                    alreadyRegister.map(item => {
                                        if (item.type === 'normal-recipe') {
                                            return (
                                                <div key={item.id} className='flex flex-row justify-between w-80  border-b-2 border-solid p-1'>
                                                    <p>{item.name}</p>
                                                    <button className='bg-red-500 text-white rounded-xl p-2 text-sm'>Excluir</button>
                                                </div>
                                            )
                                        }
                                    })
                                }
                            </div>
                        </div>
                    </section>
                    <section className='flex-col flex p-8 items-center gap-4 border-dashed border-2'>
                        <button type="submit" className='bg-green-500 text-white rounded-xl p-2 w-80 h-14'>Cadastrar</button>
                        <div className='flex flex-col'>
                            <label htmlFor="veg-recipe" className='text-xl'>Cadastrar Refeição Vegetariana</label>
                            <input type="text" name="veg-recipe" id="veg-recipe" className='border border-gray-400 rounded-md w-80' placeholder='+ Nova Refeição Vegetariana' />
                            <div className="alreadyRegister gap-4 flex flex-col py-6">
                                {
                                    alreadyRegister.map(item => {
                                        if (item.type === 'veg-recipe') {
                                            return (
                                                <div key={item.id} className='flex flex-row justify-between w-80 border-b-2 border-solid p-1'>
                                                    <p>{item.name}</p>
                                                    <button className='bg-red-500 text-white rounded-xl p-2 text-sm'>Excluir</button>
                                                </div>
                                            )
                                        }
                                    })
                                }
                            </div>
                        </div>
                    </section>
                    <section className='flex-col flex p-8 items-center gap-4 border-dashed border-2'>
                        <button type="submit" className='bg-green-500 text-white rounded-xl p-2 w-80 h-14'>Cadastrar</button>
                        <div className='flex flex-col'>
                            <label htmlFor="follow-up" className='text-xl'>Cadastrar Acompanhamento</label>
                            <input type="text" name="follow-up" id="follow-up" className='border border-gray-400 rounded-md w-80' placeholder='+ Novo Acompanhamento' />
                            <div className="alreadyRegister gap-4 flex flex-col py-6">
                                {
                                    alreadyRegister.map(item => {
                                        if (item.type === 'follow-up') {
                                            return (
                                                <div key={item.id} className='flex flex-row justify-between w-80 border-b-2 border-solid p-1'>
                                                    <p>{item.name}</p>
                                                    <button className='bg-red-500 text-white rounded-xl p-2 text-sm'>Excluir</button>
                                                </div>
                                            )
                                        }
                                    })
                                }
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    )
}