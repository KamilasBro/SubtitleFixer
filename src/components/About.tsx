
export default function About(){
    return(
        <section className="about">
            <h1>About</h1>
            <div className="about-info">
                <div>
                    This website is changing unicode symbols 
                    (<span>ex. ³, ¿, ê</span>) into it's polish counterparts. 
                    It's not translating anything. 
                    We suggest using this website as preventive tool.
                </div>
                <div>
                    The uploaded file extension 
                    should be something like <span>.srt, .txt</span> etc.
                </div>
                <div>
                    When file is uploaded, click download button and updated 
                    file will be downloaded on your device with intact extension.
                </div>
            </div>
        </section>
    )
}