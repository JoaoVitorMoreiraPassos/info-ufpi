import SideBar from '@/app/components/SideBar'
import '@/app/globals.css'
import Header from '@/app/components/Header'
import { metadata } from '@/app/layout'
import Footer from '@/app/components/Footer';
import RecipeDelete from '@/app/components/RecipeDelete';
import RecipeItemRegister from '@/app/components/RecipeItemRegister';


interface Item {
    id: number,
    name: string,
    type: string
}

interface Items {
    items: [Item],
    title: string
}

export default function CadastrarCardapio() {
    metadata.title = 'Cadastrar Cardapio';

    const alreadyRegister: Item[] = [
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
        <div>
            <div className="flex flex-row justify-start" >
                <SideBar />
                <div className='mainContainer border-l'>
                    <Header page_index={-1} />
                    <main className='flex-row flex p-14 justify-center gap-2'>
                        <RecipeItemRegister items={alreadyRegister.filter((item) => item.type === 'normal-recipe')} title='Cadastrar Refeição' />

                        <RecipeItemRegister items={alreadyRegister.filter((item) => item.type === 'veg-recipe')} title='Cadastrar Refeição Vegetariana' />

                        <RecipeItemRegister items={alreadyRegister.filter((item) => item.type === 'follow-up')} title='Cadastrar Acompanhamento' />
                    </main>
                </div>
            </div>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}