import React from 'react'
import {Routes ,Route} from 'react-router-dom'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import Footer from './Components/Footer'
import CustomCursor from './Components/CustomCursor'

const App = () => {
  return (
     <>
    <Navbar />
 <CustomCursor/>
     <Routes>
      <Route path='/' element={<Home/>} />
     </Routes>

    <Footer/>
     </>
  )
}

export default App