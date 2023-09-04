import React,{MutableRefObject, useRef, useState, useEffect} from "react"
import "./fixer.css"
//interface to make typescript happy, literally I really don't know how this work
//but he is happy
interface Props{
    setCurrentSection: React.Dispatch<React.SetStateAction<string>>
}
export default function Fixer(props:Props){
    //reference for the hidden input
    const inputRef=useRef() as MutableRefObject<HTMLInputElement>
    //files extensions list that will limit what can be uploaded
    const fileExtensionsList:string=`.cdg, .idx, .srt, .sub, .utf, .ass, .ssa, .aqt, 
        .jss, .psb, .rt, .sami, .smi, .txt, .smil, .stl, 
        .usf, .dks, .pjs, .mpl2, .mks, .vtt, .tt, .ttml, 
        .dfxp, .scc`;
    //content of the file that will be decoded, it is empty string from start to make some condition logic
    const [fileContent, setFileContent]=useState<string>("")
    //just to set downloaded file name for user
    const [fileName, setFileName]=useState<string>("")
    //to check when user is dragging something on dropbox
    const [isDragged, setIsDragged]=useState<boolean>(false)
    useEffect(()=>{
        //to prevent opening file when user misses with the file drop
        window.addEventListener("dragover",function(event){
            event.preventDefault()
          })
          window.addEventListener("drop",function(event){
            event.preventDefault()
        })
    },[])
    function decodeFile(file:string){
        //list of symbols and its counterparts
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
            //code will take filecontent and check if the file contain any
            //symbols from the list and repalce them with their counterparts
            specialSumbols.forEach(char=>{
              while(file.includes(char.coded)){
                //this will change all letters per iteration (if all characters contained code will run 11 times)
                file=file.split(char.coded).join(char.decoded)
                //this will change one letter per iteration (if all characters contained code will run much more times)
                //file=file.replace(char.coded, char.decoded) 
              }
            })
            //and we return decoded file
            return file;
    }
    //this function changes the state that is responsible for rendering sections
    //it is here to force the reset of dropbox to prevent many bugs
    function forceRender(){
        props.setCurrentSection("none")
        setTimeout(()=>{props.setCurrentSection("home")},1)
    }
    return(
        <section className="fixer">
            <h1>Fix your subtitles today!</h1>
            <div
                //if user is dragging something on dropbox the border color will be green
                //also when user uploaded the page the border will not change that indicates the user he cant
                //do that
                style={isDragged&&fileName===""?{borderColor: "#24db0f"}:{}}
                className="fixer-dropbox"
                onDragEnter={()=>{
                    setIsDragged(true)
                }}
                onDragLeave={()=>{
                    setIsDragged(false)
                }}
                onDrop={(event)=>{
                    setIsDragged(false)
                    //we check if file was uploaded
                    if(fileContent===""){
                        //if not then we check if the file exists
                        //mainly to make typescript happy
                        if(event.dataTransfer.files){
                            //then we check if the user dropped only one file and
                            //if the dropped file matches the type in the 
                            //condition (textfiles)
                        if(event.dataTransfer.files.length===1
                            &&(event.dataTransfer.files[0].type==="text/plain"
                            ||event.dataTransfer.files[0].type==="")){
                                //if all checks are good we save filename
                                //and then we are using filereader to take 
                                //content of the file
                                setFileName(event.dataTransfer.files[0].name)
                                const reader = new FileReader();
                                    reader.addEventListener('load', function() {
                                    if(typeof this.result==="string"){
                                        //if the result is the string we set our filecontent state
                                        setFileContent(this.result)
                                    }
                                })
                                    reader.readAsText(event.dataTransfer.files[0]);
                            }else{
                                //if file didn't pass the conditions, the code indicates the user
                                //what went wrong
                                event.dataTransfer.files.length>1?
                                alert("Please drop only one file!"):
                                (event.dataTransfer.files[0].type==="text/plain"||event.dataTransfer.files[0].type!=="")&&
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
                        //same as in drag and drop
                        //but we don't check if the file was uploaded and
                        //data structure is slightly different
                        //because when we click upload again or something goes wrong
                        //component will force rerender
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
                                forceRender()
                            }
                        }}}
                    hidden
                 />
                <span className="dropbox-text">
                    {/*indicator for the user*/}
                    {fileContent!==""?"File uploaded ":"Drop your file here or "}
                    <span
                    onClick={()=>{
                        if(fileContent!==""){
                            //if file was uploaded we rerender component
                            forceRender()
                        }else{
                            //if was not we trigger file upload
                            inputRef.current.click()
                        }
                    }}>
                    {/*indicator for the user*/}
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
            {/*we render download button when content file exists
            (is different that starting value) */}
            {fileContent!==""&&
            <div className="button-wrap">
                <button
                    onClick={()=>{
                        //we creating necessary elements to let user
                        //download file
                        const element = document.createElement("a");
                        //we making blob of a decoded filecontent with text type
                        const file = new Blob([decodeFile(fileContent)], {type: 'text/plain'});
                        //we creating href for the a tag
                        element.href = URL.createObjectURL(file);
                        //then we download file with updated before original name
                        element.download = `Updated ${fileName}`;
                        document.body.appendChild(element); // Required for this to work in FireFox
                        //and finally we trigger the click
                        element.click();
                    }}
                >Download</button>
            </div>}
        </section>
    )
}