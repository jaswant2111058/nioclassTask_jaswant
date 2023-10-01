
import "./style.css"
import TimingBar from "../components/utils/timingBar";
import { useData } from "../components/contextHooks/DataContext";
import { MathJax,MathJaxContext } from 'better-react-mathjax';
import { useNavigate } from 'react-router-dom';
import { FaArrowAltCircleLeft,FaArrowAltCircleRight } from "react-icons/fa";


const QuestionPage = () => {

    const { selectQues,position,setPosition,mathjax,submit,quesObject} = useData();

    const navigate = useNavigate()
    const navBtns = quesObject.map((item) => {
        if(!selectQues.length){
            return ""
        }
        return (
            <button
                className="navBtns"
                key={item.id}
                onClick={()=>setPosition(item.id)}
            >
                {`${Number(item.id) + 1}`}
            </button>
        )
    })

    

     const config  = {
        tex: {
          inlineMath: [
            ["$", "$"],
            ["\\(", "\\)"],
          ],
        },
        svg: {
          fontCache: "global",
        },
    }
    return (

        <>
            <div className="QuestionPageMain">
                <div className="progessBar">
                    <TimingBar />
                </div>
                <div className="screenWraper">
                    <div className="quesScreen">
                        <div className="mathjax">
                            {position+1}
                        <MathJaxContext config={config}>
                            <MathJax >
                                {mathjax}
                            </MathJax>
                        </MathJaxContext>
                        </div>
                        <div className="NextPriBtns">

                            <button className="privious"
                                onClick={(() => { if (position !== 0) setPosition(position - 1) })}
                            >
                              <FaArrowAltCircleLeft/>
                            </button>
                            <button className="next"
                                onClick={(() => { if (position !== selectQues.length - 1) setPosition(position + 1) })}
                            >
                                <FaArrowAltCircleRight/>
                            </button>
                        </div>
                    </div>
                 
                    <div className="navigationBarWraper">
                        {"Navigate Direct To The Question"}
                    <div className="navigationBar">
                        {navBtns}
                    </div>
                        <div className="submitWraper">
                        <button className="submit" onClick={(()=>{
                            submit();
                            navigate("/finalsubmit")
                        })} >
                            Submit
                        </button>
                        </div>
                        
                    </div>
                </div>

            </div>
        </>
    )
}

export default QuestionPage;