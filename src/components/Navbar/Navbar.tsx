import React,{useState} from "react";
import "./navbar.css"
//typescript interface to make sure props will always have given types
interface Props{
    currentSection: string,
    setCurrentSection: React.Dispatch<React.SetStateAction<string>>
}

export default function Navbar(props:Props){
    const [isAnimFinished, setIsAnimFinished]=useState<boolean>(true)
    //prevent reseting animations with buttons

    //function will take section name as string
    function handleClick(section:string){
        //that will signal the code that animation is currently working
        setIsAnimFinished(false)
        setTimeout(()=>{
            //then after 1st section aniamtion (250ms) we set our prop 
            //that will handle section change
            props.setCurrentSection(section)

            //then the 2nd animation starts off (another 250ms)
            //and to prevent canceling animations after the 2nd animation
            //code will set isAnimFinished state to false 
            //and then user will be allowed to click again on button
            setTimeout(()=>setIsAnimFinished(true),250)
        },250)
    }
    return(
        <nav>
            <div className="inner-nav">
                <div className="inner-nav-title">
                    Polish Subtitles Fixer
                </div>
                <ul className="inner-nav-menu">
                    <li onClick={()=>{
                        if(isAnimFinished===true){
                            //if aniamtion is not working we set new animation and change section state
                            if(props.currentSection==="about")
                            (document.querySelector(".about") as HTMLDivElement).style.animation="aboutAnim2 0.5s"
                            handleClick("home")
                        }
                    }}>Home</li>
                    <li onClick={()=>{
                        if(isAnimFinished===true){
                            //same over here
                            if(props.currentSection==="home")
                            (document.querySelector(".fixer") as HTMLDivElement).style.animation="fixerAnim2 0.5s"
                            handleClick("about")
                        }
                    }}>About</li>
                </ul>
            </div>
        </nav>
    )
}
//the code cycle between animations and sections