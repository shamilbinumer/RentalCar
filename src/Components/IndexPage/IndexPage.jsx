import React from 'react'
import Navbar from '../Navbar/Navbar'
import './IndexPage.scss'

const IndexPage = () => {
  return (
    <div className='IndexMainDiv'>
        <Navbar/>
        <div className="hero">
            <div className="hero-left"></div>
            <div className="hero-right"></div>
        </div>
    </div>
  )
}

export default IndexPage
