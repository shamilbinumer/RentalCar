import React from 'react'
import './AddVehicle.scss'
import { Link } from 'react-router-dom'
import { TbSquareRoundedArrowLeftFilled } from "react-icons/tb";

const AddVehicle = () => {
  return (
    <div className='addVehicleMain'>
      <div className="back_btn">
        <Link to='/admin'><TbSquareRoundedArrowLeftFilled className='backBtn' /></Link>
      </div>
      <div className="form">
        <div className="main_card">
            <h2>Add New Vehicle</h2>
            <div className="inputs">
                <form action="">
                    <div>
                        <input type="text" placeholder='Vehicle Type' />
                        <input type="text" placeholder='Brand' />
                    </div>
                    <div>
                        <input type="text" placeholder='Model Name' />
                        <input type="text" placeholder='colour of Vehicle' />
                    </div>
                    <div>
                        <input type="text" placeholder='Year of Registration' />
                       <select name="" id="">
                        <option>Fuel Type</option>
                            <option value="Petrol">Petrol</option>
                            <option value="Diesel">Diesel</option>
                        </select>
                    </div>
                    <div>
                        <input type="text" placeholder='Rent / Day' />
                        <input type="text" placeholder='Rent / Month' />
                    </div>
                    <div className='file-input'>
                        <input type="file" placeholder='photo' />
                    </div>
                </form>
            </div>
        </div>
      </div>
    </div>
  )
}

export default AddVehicle
