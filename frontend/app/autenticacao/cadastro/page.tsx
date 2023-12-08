import Image from 'next/image'
import '../../globals.css'
import Link from 'next/link'
import '../style.css'
import { metadata } from '@/app/layout';
import RegisterForm from '@/app/components/RegisterForm'

export default function Cadastro() {
    metadata.title = 'Cadastro';
    return (
        <div className="flex justify-center items-center h-screen" >
            <div className='loginCardContainer border-l flex-column items-center justify-center rounded m-auto'>
                <div className=' flex items-center justify-center'>
                    <Image src={'/logo.png'} width={241} height={202.24} alt='logo' className='w-40 mix-blend-difference' />
                </div>
                <RegisterForm />
                <div className='flex flex-col items-center py-4'>
                    <p>
                        Já possui uma conta?
                        <Link href='/autenticacao/login/' className=' text-cyan-600 ml-1'>
                            Entre aqui.
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
