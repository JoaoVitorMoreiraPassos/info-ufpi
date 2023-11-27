'use client'
import SideBar from '@/app/components/SideBar'
import HomeContent from '@/app/components/MainContent/HomeContent'
import '@/app/globals.css'
import Header from '@/app/components/Header'
import './style.css'


export default function CadastrarNoticia() {
    const regular_recipes = [
        {
            id: 1,
            name: 'Assado de Panela',
            type: 'normal-recipe'
        },
        {
            id: 2,
            name: 'Carne ao Molho',
            type: 'normal-recipe'
        },
        {
            id: 3,
            name: 'Frango Assado',
            type: 'normal-recipe'
        }
    ]

    const veg_recipes = [
        {
            id: 1,
            name: 'Stronoff de Grão de Bico',
            type: 'veg-recipe'
        },
        {
            id: 2,
            name: 'Feijoada Vegetariana',
            type: 'veg-recipe'
        },
        {
            id: 3,
            name: 'Bife de Soja',
            type: 'veg-recipe'
        }
    ]

    const follow_ups = [
        {
            id: 1,
            name: 'Arroz',
            type: 'follow-up'
        },
        {
            id: 2,
            name: 'Feijão',
            type: 'follow-up'
        },
        {
            id: 3,
            name: 'Macarrão',
            type: 'follow-up'
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
        }
    ]

    return (
        <main className="flex flex-row justify-start" >
            <SideBar />
            <div className='mainContainer border-l'>
                <Header />
                <div className='flex-col flex p-14 justify-center items-center w-full gap-8'>
                    <p className='text-2xl'>
                        Cadastrar Refeição
                    </p>
                    <section className='flex-col flex gap-2 w-full items-center'>
                        <label htmlFor="date">
                            Data
                        </label>
                        <input type="date" name="date" id="date" className='border border-gray-400 rounded-md w-96' />
                        <label htmlFor="meal">
                            Refeição
                        </label>
                        <select name="meal" id="meal" className='border border-gray-400 rounded-xl w-96 h-16 px-4' >
                            <option value="breakfast">Café da Manhã</option>
                            <option value="lunch">Almoço</option>
                            <option value="dinner">Jantar</option>
                        </select>
                    </section>
                    <section className='flex flex-row gap-16 w-full justify-center'>
                        <div className='flex flex-col gap-2'>
                            <p className='text-center'>
                                Refeição Geral
                            </p>
                            <select name="" id="" className='h-16 px-4 w-96' placeholder='Refeição Normal'>
                                {
                                    regular_recipes.map(item => {
                                        if (item.type === 'normal-recipe') {
                                            return (
                                                <option value={item.id} key={'ref' + item.id}>{item.name}</option>
                                            )
                                        }
                                    })
                                }
                            </select>
                            <input type="text" placeholder='+ Adicional' className="w-96 bg-slate-200" />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p className='text-center'>
                                Refeição Vegetariana
                            </p>
                            <select name="" id="" className='h-16 px-4 w-96'>
                                {
                                    veg_recipes.map(item => {
                                        if (item.type === 'veg-recipe') {
                                            return (
                                                <option value={item.id} key={'ref_veg' + item.id}>{item.name}</option>
                                            )
                                        }
                                    })

                                }
                            </select>
                            <input type="text" placeholder='+ Adicional' className="w-96 bg-slate-200" />
                        </div>
                    </section>

                    <section className='flex flex-col gap-2 items-start'>
                        <p className='text-xl'>
                            Acompanhamentos
                        </p>
                        <div className='flex flex-col flex-wrap gap-2'>

                            {
                                follow_ups.map(item => {
                                    if (item.type === 'follow-up') {
                                        return (
                                            <div key={item.id} className='flex flex-row gap-2 items-center'>
                                                <input type="checkbox" name={item.name + item.id} id={item.name} className='w-6 h-6' />
                                                <label htmlFor={item.name} className='text-lg'>
                                                    {item.name}
                                                </label>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>
                    </section>
                </div>
                <div className='flex flex-row justify-between items-start gap-8 px-8 pb-8'>
                    <div className='flex flex-col gap-4'>
                        <button className='bg-blue-500 text-white w-96 h-14 rounded-xl text-xl'> + Nova opção</button>
                        <button className=' bg-blue-200 w-96 h-14 rounded-xl text-slate-600 text-xl'> Voltar</button>
                    </div>
                    <button className='bg-green-500 text-white w-96 h-14 rounded-xl text-xl'>
                        Cadastrar
                    </button>
                </div>
            </div>
        </main>
    )
}