import Image from 'next/image'
import Link from 'next/link'
import { metadata } from '@/app/layout'
import LoginForm from '@/app/components/LoginForm'
import '../style.css'

export default function Login() {
    metadata.title = 'Login';

    return (
        <div className="flex justify-center items-center h-screen" >
            <div className='loginCardContainer border-l flex-column items-center justify-center rounded m-auto'>
                <div className=' flex items-center justify-center'>
                    <Image src={'/logo.png'} width={241} height={202.24} alt='logo' className='w-40 mix-blend-difference' />
                </div>
                < LoginForm />
                <div className='flex flex-col items-center py-4'>
                    <p>
                        Não tem uma conta?
                        <Link href='/autenticacao/cadastro/' className=' text-cyan-600 ml-1'>
                            Cadastre-se aqui.
                        </Link>
                    </p>
                    <Link href="/autenticacao/recuperar" className='text-cyan-600'>Esqueceu sua senha?</Link>
                </div>
            </div>
        </div>
    )
}
