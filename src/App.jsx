
import './App.css'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import IndexPage from './Components/IndexPage/IndexPage'
import AdminReg from './Components/AdminReg/AdminReg'
import AdminLogin from './Components/AdminLogin/AdminLogin'
import AdminHome from './Components/AdminHome/AdminHome'
import AddCar from './Components/AddCar/AddCar'
import AddBike from './Components/AddBike/AddBike'
import EditCar from './Components/EditCar/EditCar'
import EditBike from './Components/EditBike/EditBike'
import CustReg from './Components/CustRegiter/CustReg'
import CustLogin from './Components/CustLogin/CustLogin'
import VehicleDetails from './Components/VehicleDetails/VehicleDetails'
import FavouratePage from './Components/Favourate/FavouratePage'
import BookingPage from './Components/BookingPage/BookingPage'

function App() {


  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path='/' Component={IndexPage}/>
      <Route path='/adminRegistration' Component={AdminReg}/>
      <Route path='/adminLogin' Component={AdminLogin}/>
      <Route path='/admin' Component={AdminHome}/>
      <Route path='/addCar' Component={AddCar}/>
      <Route path='/addBike' Component={AddBike}/>
      <Route path='/editCar/:type/:id' Component={EditCar}/>
      <Route path='/editBike/:type/:id' Component={EditBike}/>
      <Route path='/custReg' Component={CustReg}/>
      <Route path='/custLogin' Component={CustLogin}/>
      <Route path='/vehicleDetails/:type/:id' Component={VehicleDetails}/>
      <Route path='/FavouratePage/:id' Component={FavouratePage}/>
      <Route path='/BookingPage/:type/:prod_id' Component={BookingPage}/>
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
