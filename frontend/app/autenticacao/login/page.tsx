import Image from 'next/image'
import PasswordInput from '../../components/PasswordInput'
import '../../globals.css'

import '../style.css'

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center" >
        <div className='loginCardContainer border-l flex-column items-center justify-center rounded'>
            <div className=' flex items-center justify-center'>
                <Image src={'/logo.png'} width={241} height={202.24} alt='logo' className='w-40 mix-blend-difference'/>

            </div>
            <form action="post" className=' flex flex-col p-6 gap-6 w-1/1 items-center '>
                <input className="rounded-lg" type="text" name="username" id="username" placeholder="E-mail ou telefone"/>
                <PasswordInput/>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-40">Entrar</button>
            </form>
            <div className='flex flex-col items-center py-4'>
                <p>
                    Não tem uma conta?
                    <a href='/autenticacao/cadastro/' className=' text-cyan-600 ml-1'>
                        Cadastre-se aqui.
                    </a>
                </p>
                <a href="" className='text-cyan-600'>Esqueceu sua senha?</a>
            </div>
      </div>
    </main>
  )
}
