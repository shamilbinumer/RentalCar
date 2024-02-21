
import './App.css'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import IndexPage from './Components/IndexPage/IndexPage'
import AdminReg from './Components/AdminReg/AdminReg'
import AdminLogin from './Components/AdminLogin/AdminLogin'
import AdminHome from './Components/AdminHome/AdminHome'

function App() {


  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path='/' Component={IndexPage}/>
      <Route path='/adminRegistration' Component={AdminReg}/>
      <Route path='/adminLogin' Component={AdminLogin}/>
      <Route path='/admin' Component={AdminHome}/>
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
