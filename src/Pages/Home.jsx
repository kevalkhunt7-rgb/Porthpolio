import React from 'react'
import Hero from '../Components/Hero'
import About from '../Components/About'
import Skills from '../Components/Skills'
import Projects from '../Components/Projects'
import Contact from '../Components/Contact'


const Home = () => {
  return (
    <div>
        <Hero />
        <About/>
        <Skills/>
        <Projects/> 
        <Contact/>
        
       
    </div>
  )
}

export default Home