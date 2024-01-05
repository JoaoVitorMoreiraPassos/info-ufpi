'use client';
import React, { use } from 'react'
import { Inria_Serif } from 'next/font/google'
import NavBar from './NavBar'
import ProfileBar from './ProfileBar'
import { useState, useEffect } from 'react'
import './style.css'

const inria_serif = Inria_Serif({ weight: "700", subsets: ['latin'], })

const Header = ({ page_index }: { page_index: undefined | Number }) => {

  return (
    <>
      <div className={`  h-20 navContainer navbar-center text-white text-xl flex-row items-center justify-between ${inria_serif.className}`}>
        <NavBar page_index={page_index} />
        <ProfileBar />
      </div>
    </>
  )
}

export default Header
