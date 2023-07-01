import React,{useState} from "react";
interface Props{
    currentSection: string,
    setCurrentSection: React.Dispatch<React.SetStateAction<string>>
}
export default function Navbar(props:Props){
    const [isAnimFinished, setIsAnimFinished]=useState<boolean>(true)
    function handleClick(section:string){
        setIsAnimFinished(false)
        setTimeout(()=>{
            props.setCurrentSection(section)
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
                            if(props.currentSection==="about")
                            (document.querySelector(".about") as HTMLDivElement).style.animation="aboutAnim2 0.5s"
                            handleClick("home")
                        }
                    }}>Home</li>
                    <li onClick={()=>{
                        if(isAnimFinished===true){
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