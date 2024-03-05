
import {BrowserRouter,Routes,Route} from 'react-router-dom'
// import Home from './pages/Home'
import Home from './components/Home'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import SignUp from './pages/SignUp'
import Signin from './pages/Signin'
import Header from './components/Header'
import Footer from './components/Footer'
import PrivateRoute from './components/PrivateRoute'

export default function App() {
  return (
   <BrowserRouter>
   <Header/>
     <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/about' element={<About/>}></Route>
      <Route path='/projects' element={<Projects/>}></Route> 
      <Route path='/sign-in' element={<Signin/>}></Route>
      <Route path='/Sign-up' element={<SignUp/>}></Route>
      <Route element={<PrivateRoute/>}>
       <Route path='/dashboard' element={<Dashboard/>}></Route>
 
      </Route>

       



     </Routes>

     <Footer/>

     
   </BrowserRouter>


  )
}