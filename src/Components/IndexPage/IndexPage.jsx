import React from 'react'
import Navbar from '../Navbar/Navbar'
import './IndexPage.scss'
import { Link } from 'react-router-dom'

const IndexPage = () => {
  return (
    <div className='IndexMainDiv'>
        <Navbar/>
        <div className="hero">
            <div className="hero-left">
              <h1>Easy And Fast<div>Way To <span>Rent</span> Your</div> Car</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit alias iure molestias quod quos soluta amet quam! Non qui distinctio, numquam, reprehenderit libero dolorem ad nihil excepturi nulla deleniti dolore.</p>
              <div className='RentCarBtnDiv'>
                <Link className='RenrCarBtn'>Rent Car</Link>
              </div>
            </div>
            <div className="hero-right"></div>
        </div>
    </div>
  )
}

export default IndexPage
