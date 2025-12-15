import { Navigate, Route, Routes } from 'react-router-dom'

import React from 'react'
import Navbar from './navbar'
import MainSection from './section'
import Footer from './footer'

function HomeConnect() {
  return (
    <div>
        <Navbar/>
        <MainSection/>
        <Footer/>
      
    </div>
  )
}

export default HomeConnect
