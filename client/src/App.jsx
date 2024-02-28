
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import SignUp from './pages/SignUp'
import Signin from './pages/Signin'
import Header from './components/Header'
import Footer from './components/Footer'

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
      <Route path='/dashboard' element={<Dashboard/>}></Route>

       



     </Routes>

     <Footer/>

     
   </BrowserRouter>


  )
}