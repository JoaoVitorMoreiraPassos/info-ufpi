import React from 'react'
import { Inria_Serif } from 'next/font/google'
import NavBar from './NavBar'
import ProfileBar from './ProfileBar'

const inria_serif = Inria_Serif({ weight: "700", subsets: ['latin'], })

const Header = () => {
  return (
    <div className={` h-16 navContainer navbar-center text-white text-xl flex-row items-center justify-between ${inria_serif.className}`}>
      <NavBar />
      <ProfileBar />
    </div>
  )
}

export default Header
