import SideBar from '@/app/components/SideBar'
import '@/app/globals.css'
import Header from '@/app/components/Header'
import './style.css'
import { metadata } from '@/app/layout'
import Footer from '@/app/components/Footer'
import MealForm from '@/app/components/MealForm'
import MealFormsContainer from '@/app/components/MealFormsContainer'


export default function CadastrarRefeicao() {
    metadata.title = 'Cadastrar Refeição'
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
        <div>
            <div className="flex flex-row justify-start" >
                <SideBar />
                <div className='mainContainer w-full'>
                    <Header page_index={-1} />
                    <main className=''>
                        <MealFormsContainer regular_recipes={regular_recipes} veg_recipes={veg_recipes} follow_ups={follow_ups} />
                    </main>
                </div>
            </div>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}