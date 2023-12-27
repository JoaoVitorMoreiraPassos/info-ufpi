'use client';
import React, { use } from 'react'
import { Inria_Serif } from 'next/font/google'
import NavBar from './NavBar'
import ProfileBar from './ProfileBar'
import { useState, useEffect } from 'react'

const inria_serif = Inria_Serif({ weight: "700", subsets: ['latin'], })

const Header = ({ page_index }: { page_index: undefined | Number }) => {

  const [screenWidth, setScreenWidth] = useState<number>(1025);
  const [screenHeight, setScreenHeight] = useState<number>(0);

  React.useEffect(() => {
    setScreenWidth(window.innerWidth);
    setScreenHeight(window.innerHeight);
  }, []);

  React.useEffect(() => {
    window.addEventListener("resize", () => {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    });
  }, []);
  return (
    <>
      {
        screenWidth <= 1024 ? (
          (<div className={`  h-20 navContainer navbar-center text-white text-xl flex-row items-center justify-between ${inria_serif.className} fixed top-0 z-50`}>
            <NavBar page_index={page_index} />
            <ProfileBar />
          </div>)
        )
          :
          (
            (<div className={`  h-20 navContainer navbar-center text-white text-xl flex-row items-center justify-between ${inria_serif.className}`}>
              <NavBar page_index={page_index} />
              <ProfileBar />
            </div>)
          )

      }
    </>
  )
}

export default Header
