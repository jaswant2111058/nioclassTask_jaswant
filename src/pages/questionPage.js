
import "./style.css"
import axios from 'axios';
import TimingBar from "../components/utils/timingBar";
import { useData } from "../components/contextHooks/DataContext";
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaChevronLeft, FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { useEffect,useState } from "react";


const QuestionPage = () => {

    const { selectQues, position, setPosition, submit, quesObject, setIsfinal } = useData();

    const [mathjax,setMathjax] = useState("")

    const navigate = useNavigate()

    const navBtns = quesObject.map((item) => {
        if (!selectQues.length) {
            return ""
        }
        return (
            <button
                className="navBtns"
                key={item.id}
                onClick={() => setPosition(item.id)}
            >
                {`${Number(item.id) + 1}`}
            </button>
        )
    })
    
            useEffect(()=>{
                if(!selectQues.length){
                    navigate("/")
                }
            }) 
            useEffect(() => {
                async function changeQues(whichOne) {
                  try {
            
                    if (selectQues.length) {
                      const res = await axios.get(`https://0h8nti4f08.execute-api.ap-northeast-1.amazonaws.com/getQuestionDetails/getquestiondetails?QuestionID=${quesObject[whichOne].question}`)
                      if (!res) {
                        window.alert("something went wrong")
                      }
                      else {
                         
                        setMathjax(res.data[0].Question)
                      }
                    }
                  }
            
                  catch (err) {
                    console.log(err)
                  }
                }
                changeQues(position)
              })


    const config = {
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
                    <div className="optBar">
                        <FaBars onClick={() => { document.getElementById("slideBar").style.width="250px" }}/>
                    </div>
                    <TimingBar />

                </div>
                <div className="screenWraper">
                    <div className="quesScreen">
                        <div className="mathjax">
                            <h3>{`${position + 1}.`} </h3>
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
                                <FaArrowAltCircleLeft />
                            </button>
                            <button className="next"
                                onClick={(() => { if (position !== selectQues.length - 1) setPosition(position + 1) })}
                            >
                                <FaArrowAltCircleRight />
                            </button>
                        </div>
                    </div>

                    <div className="navigationBarWraper" id="navigationBarWraper">
                        <div className="upper">
                            <p>Navigate To The Question</p>
                        </div>
                        <div className="navigationBar">
                            {navBtns}
                        </div>
                        <div className="submitWraper">
                            <button className="submit" onClick={(() => {
                                 if(selectQues.length){
                                    submit();
                                    setIsfinal(true)
                                    navigate("/finalsubmit")}
                                    else{
                                        navigate("/")
                                    }
                            })}>
                                Submit
                            </button>
                        </div>

                    </div>
                </div>

                <div className="slideBar" id ="slideBar">

                    <div className="upper">
                            <p>Navigate To The Question</p>
                            <div className="closeIcon">
                                <FaChevronLeft onClick={() => { document.getElementById("slideBar").style.width="0px" }} />
                            </div>
                    </div>
                        <div className="navigationBar">
                            {navBtns}
                        </div>
                        <div className="submitWraper">
                            <button className="submit" onClick={(() => {
                                if(selectQues.length){
                                submit();
                                setIsfinal(true)
                                navigate("/finalsubmit")}
                                else{
                                    navigate("/")
                                }
                            })} >
                                Submit
                            </button>
                        </div>

                </div>

            </div>
        </>
    )
}

export default QuestionPage;