
import "./style.css"

import TimingBar from "../components/utils/timingBar";
import { useData } from "../components/contextHooks/DataContext";

import { useNavigate } from 'react-router-dom';
import { FaBars, FaChevronLeft, FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { useEffect } from "react";
import Mathjax from "../components/utils/mathJax";



const QuestionPage = () => {

    const { selectQues, position ,setPosition, submit, quesObject, setIsfinal } = useData();

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
                            
                                {<Mathjax quesId={selectQues[position]}/>}
                           
                        </div>
                        <div className="NextPriBtns">

                            <button className="privious"
                                onClick={(() => { if (position !== 0) setPosition(position - 1) })}
                            >
                                <FaArrowAltCircleLeft />
                            </button>
                            <button className="next"
                                onClick={(() => { if (position !== (selectQues.length - 1)) setPosition(position + 1) })}
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