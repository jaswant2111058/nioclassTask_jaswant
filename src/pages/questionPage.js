
import "./style.css"
import TimingBar from "../components/utils/timingBar";
import { useData } from "../components/contextHooks/DataContext";
import { MathJax,MathJaxContext } from 'better-react-mathjax';



const QuestionPage = () => {

    const { selectQues,position,setPosition,mathjax } = useData()


    let quesObject = [{}];

    for (let i = 0; i < selectQues.length; i++) {
        let newObj = {
            id: i,
            question: selectQues[i]
        }
        quesObject[i] = newObj;
    }

   
    

    const navBtns = quesObject.map((item) => {
        if(!selectQues){
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

                              {"<--"}

                            </button>
                            <button className="next"
                                onClick={(() => { if (position !== selectQues.length - 1) setPosition(position + 1) })}
                            >
                                {"-->"}
                            </button>
                        </div>
                    </div>
                    <hr />
                    <div className="navigationBarWraper">
                        {"JUMP DIRECT TO THE QUESTION"}
                    <div className="navigationBar">
                        {navBtns}
                    </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default QuestionPage;