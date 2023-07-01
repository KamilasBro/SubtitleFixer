import React,{MutableRefObject, useRef, useState, useEffect} from "react"
interface Props{
    currentSection?: string,
    setCurrentSection: React.Dispatch<React.SetStateAction<string>>
}
export default function Fixer(props:Props){
    const inputRef=useRef() as MutableRefObject<HTMLInputElement>
    const fileExtensionsList:string=`.cdg, .idx, .srt, .sub, .utf, .ass, .ssa, .aqt, 
        .jss, .psb, .rt, .sami, .smi, .txt, .smil, .stl, 
        .usf, .dks, .pjs, .mpl2, .mks, .vtt, .tt, .ttml, 
        .dfxp, .scc`;
    const [fileContent, setFileContent]=useState<string>("")
    const [fileName, setFileName]=useState<string>("")
    const [isDragged, setIsDragged]=useState<boolean>(false)
    useEffect(()=>{
        window.addEventListener("dragover",function(event){
            event.preventDefault()
          })
          window.addEventListener("drop",function(event){
            event.preventDefault()
        })
    },[])
    function decodeFile(file:string){
        const specialSumbols=[
            {
                decoded: "ą",
                coded: "¹" 
            },
            {
                decoded: "ć",
                coded: "æ" 
            },
            {
                decoded: "ę",
                coded: "ê" 
            },
            {
                decoded: "ł",
                coded: "³" 
            },
            {
                decoded: "ń",
                coded: "ñ" 
            },
            {
                decoded: "ś",
                coded: "œ" 
            },
            {
                decoded: "ź",
                coded: "Ÿ" 
            },
            {
                decoded: "ż",
                coded: "¿" 
            },
            {
                decoded: "Ć",
                coded: "Æ" 
            },
            {
                decoded: "Ę",
                coded: "Ê" 
            },
            {
                decoded: "Ń",
                coded: "Ñ" 
            },
            {
                decoded: "Ś",
                coded: "Œ" 
            }
        ]
            specialSumbols.forEach(char=>{
              while(file.includes(char.coded)){
                file=file.split(char.coded).join(char.decoded);//this will change all letters per iteration
                //file=file.replace(char.coded, char.decoded) this will change one letter per iteration
              }
            })
            return file;
    }
    return(
        <section className="fixer">
            <h1>Fix your subtitles today!</h1>
            <div 
                style={isDragged?{borderColor: "#24db0f"}:{}}
                className="fixer-dropbox"
                onDragEnter={()=>{
                    setIsDragged(true)
                }}
                onDragLeave={()=>{
                    setIsDragged(false)
                }}
                onDrop={(event)=>{
                    setIsDragged(false)
                    if(fileContent===""){
                        if(event.dataTransfer.files){
                        if(event.dataTransfer.files.length===1
                            &&(event.dataTransfer.files[0].type==="text/plain"
                            ||event.dataTransfer.files[0].type==="")){
                                setFileName(event.dataTransfer.files[0].name)
                                const reader = new FileReader();
                                    reader.addEventListener('load', function() {
                                    if(typeof this.result==="string"){
                                        setFileContent(this.result)

                                    }
                                })
                                    reader.readAsText(event.dataTransfer.files[0]);
                            }else{
                                event.dataTransfer.files.length>1?
                                alert("Please drop only one file!"):
                                (event.dataTransfer.files[0].type==="text/plain"||event.dataTransfer.files[0].type==="")&&
                                alert("Wrong file exstension!")
                            }
                    }}
                    }}>
                <svg viewBox="0 0 1024 1024" className="dropbox-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                    <g id="SVGRepo_iconCarrier">
                        <path d="M768 810.7c-23.6 0-42.7-19.1-42.7-42.7s19.1-42.7 42.7-42.7c94.1 0 170.7-76.6 170.7-170.7 0-89.6-70.1-164.3-159.5-170.1L754 383l-10.7-22.7c-42.2-89.3-133-147-231.3-147s-189.1 57.7-231.3 147L270 383l-25.1 1.6c-89.5 5.8-159.5 80.5-159.5 170.1 0 94.1 76.6 170.7 170.7 170.7 23.6 0 42.7 19.1 42.7 42.7s-19.1 42.7-42.7 42.7c-141.2 0-256-114.8-256-256 0-126.1 92.5-232.5 214.7-252.4C274.8 195.7 388.9 128 512 128s237.2 67.7 297.3 174.2C931.5 322.1 1024 428.6 1024 554.7c0 141.1-114.8 256-256 256z" fill="#134074"/>
                        <path d="M640 789.3c-10.9 0-21.8-4.2-30.2-12.5L512 679l-97.8 97.8c-16.6 16.7-43.7 16.7-60.3 0-16.7-16.7-16.7-43.7 0-60.3l128-128c16.6-16.7 43.7-16.7 60.3 0l128 128c16.7 16.7 16.7 43.7 0 60.3-8.4 8.4-19.3 12.5-30.2 12.5z" fill="#8da9c4"/>
                        <path d="M512 960c-23.6 0-42.7-19.1-42.7-42.7V618.7c0-23.6 19.1-42.7 42.7-42.7s42.7 19.1 42.7 42.7v298.7c0 23.5-19.1 42.6-42.7 42.6z" fill="#8da9c4"/>
                    </g>
                </svg>
                <input 
                    type="file"
                    ref={inputRef}
                    accept={fileExtensionsList}
                    
                    onChange={(event)=>{
                        if(event.target.files){
                            if(event.target.files[0].type==="text/plain"||event.target.files[0].type===""){
                                setFileName(event.target.files[0].name)
                                const reader = new FileReader();
                                reader.addEventListener('load', function() {
                                if(typeof this.result==="string"){
                                    setFileContent(this.result)
                                    
                                }
                            })
                            reader.readAsText(event.target.files[0]);      
                            }else{
                                alert("Wrong file exstension!")
                            }
                        }}}
                    hidden
                 />
                <span className="dropbox-text">
                    {fileContent!==""?"File uploaded ":"Drop your file here or "}
                    <span
                    onClick={()=>{
                        if(fileContent!==""){
                            props.setCurrentSection("none")
                            setTimeout(()=>{props.setCurrentSection("home")},1)
                            //conditional rerender to solve stupid bug
                        }else{
                            inputRef.current.click()
                        }
                    }}>
                    {fileContent!==""?"Upload Again":"Upload Manually"}
                    </span>
                </span>
            </div>
            <p>
                <span>Note that</span> the fixer in order to 
                work, uploaded file should be in
                <span> polish language</span>, as 
                the title of the site suggests.
            </p>
            {fileContent!==""&&
            <div className="button-wrap">
                <button
                    onClick={()=>{
                        const element = document.createElement("a");
                        const file = new Blob([decodeFile(fileContent)], {type: 'text/plain'});
                        element.href = URL.createObjectURL(file);
                        element.download = `Updated ${fileName}`;
                        document.body.appendChild(element); // Required for this to work in FireFox
                        element.click();
                    }}
                >Download</button>
            </div>}
        </section>
    )
}