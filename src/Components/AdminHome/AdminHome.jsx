import React from 'react'
import './AdminHome.scss'
import NavbarAdmin from '../NavabarAdmin/NavbarAdmin'
import axios from 'axios'

const AdminHome = () => {
  return (
    <div className='adminHomeMainDiv'>
      <NavbarAdmin/>
      <div className="adminHomeBanner">
       <div className="bannerSub">
            <div className="BannerLeft"></div>
            <div className="BannerRight"></div>
       </div>

      </div>
    </div>
  )
}

export default AdminHome
