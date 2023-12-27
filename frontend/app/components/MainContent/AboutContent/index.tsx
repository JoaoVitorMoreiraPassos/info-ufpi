import React from 'react'
import Image from 'next/image'
import { Inria_Serif } from 'next/font/google'

const inria_serif = Inria_Serif({ weight: '400', subsets: ['latin'] })

const AboutContent = () => {
    return (
        <div className={`aboutContainer flex-column pt-10 mt-8 px-32 items-center justify-center ${inria_serif.className}`} >
            <div className='w-full flex flex-col items-center justify-center' >
                <h1 className={'text-2xl pl-6 pb-2'}>Sobre</h1>
                <Image src="/ufpi2.png" alt="Logo" width={1608.37} height={823.45} className='aboutImage mix-blend-normal max-w-6xl' />
            </div>
            <div className='mb-20 mt-8 flex justify-center'>
                <p className=' aboutContent text-justify text-xl max-w-6xl'>
                    O Campus Senador Helvídio Nunes de Barros (CSHNB), sediado à Rua Cícero Duarte, n. 905, Bairro do Junco, em Picos (PI), foi criado no ano de 1982 com 5 (cinco) Cursos de Licenciatura Curta (duração de dois anos), a saber: Ciências de 1º grau, Estudos Sociais de 1º Grau, Letras de 1º Grau, Pedagogia com Habilitação em Supervisão e Pedagogia com Habilitação em Administração. Em 1984 é autorizada a plenificação (duração de quatro anos) dos cursos de Pedagogia/Supervisão e Pedagogia/Administração, bem como a criação dos cursos de Licenciatura Plena em Letras e Licenciatura Plena em  Pedagogia  com habilitação em Magistério. Todavia, a inexistência de documentação que comprovasse juridicamente a criação do Campus, a falta de espaço apropriado para as atividades acadêmicas, além do baixo índice de aprovação nos vestibulares fizeram com o mesmo fosse fechado, por unanimidade de votos no Conselho Universitário da UFPI, em 25 de junho de 1987.
                    Quatro anos depois, em 10 de junho de 1991, é autorizado a reabertura do Campus com apenas 2 (dois) cursos de Licenciatura Plena: Letras e Pedagogia- Habilitação em Magistério. Em 2006, após a adesão da UFPI ao Programa de Reestruturação e Expansão das Universidades - REUNI, foram implantados mais 7 (sete) novos cursos (Administração, Ciências Biológicas, Enfermagem, História, Matemática, Nutrição, Sistemas de Informação) e no ano de 2013 foi instituído o Curso de Licenciatura em Educação do Campo/Ciências da Natureza- LEDOC, totalizando em 10 (dez) modalidades de graduação. Convém lembrar que, data de 2006 a oficialidade da criação do Campus antes denominado Campus do Junco, doravante passou a ser chamado de Campus Senador Helvídio Nunes de Barros (CSHNB).                 </p>
            </div>
        </div>
    )
}

export default AboutContent
