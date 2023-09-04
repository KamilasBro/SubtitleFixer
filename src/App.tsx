import React,{useState} from 'react';

import Navbar from './components/Navbar/Navbar';
import Fixer from './components/Fixer/Fixer';
import About from './components/About/About';

export default function App() {

  const [currentSection, setCurrentSection]=useState<string>("home")
  //to determine which section is active

  //we return 3 components with 2 props passes
  // fixer and about are conditional rendered, state changes in navbar
  //with one exception (more in Fixer.tsx)
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
