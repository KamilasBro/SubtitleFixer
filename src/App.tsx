import React,{useState} from 'react';

import Navbar from './components/Navbar';
import Fixer from './components/Fixer';
import About from './components/About';

export default function App() {

  const [currentSection, setCurrentSection]=useState<string>("home")
  return (
    <>
      <Navbar currentSection={currentSection} setCurrentSection={setCurrentSection}/>
      <main>
        {currentSection==="home"&&<Fixer setCurrentSection={setCurrentSection}/>}
        {currentSection==="about"&&<About/>}
      </main>
    </>
  )
}
