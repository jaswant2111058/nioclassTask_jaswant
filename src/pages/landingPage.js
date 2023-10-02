import { useData } from "../components/contextHooks/DataContext";
import { QuestionsId } from "../components/utils/questinsList";
import { useNavigate } from 'react-router-dom';
import "./style.css"


const LandingPage = () => {

    const { user, setUser, setQues, selectQues,setStart } = useData();
    const navigate = useNavigate()
    function handleChange(e) {
        setUser(e.target.value)
    }
    function handleClick(e) {
        if(e.target.checked){
            setQues([...selectQues, e.target.value])
        }
        else{
            let auxArray = [...selectQues];
            auxArray.pop()
            setQues(auxArray)
        }
       
    }
   
    const QuesList = QuestionsId.map((items) => {

        return (

            <div className="quseList" key={items}>
               
                <p>{items}</p>
                <input
                    className="checkBox"
                    type="checkbox"
                    value={items}
                    onChange={handleClick}
                />
                
            </div>
        )
    })

    function nextPage(){
        if(!selectQues.length){
            window.alert("First Select QUESTIONS ")
        }
        else if(!user){
            
            window.alert("user name is required")
        }
        else{
        setStart(true)
        navigate("/questions")
        }
    }

    return (
        <>

            <div className="landingMain">
                <div className="landing">
                    <div className="user_name">
                        <input
                           
                            name="userName"
                            value={user}
                            placeholder="Enter User Name ..."
                            onChange={handleChange}
                        />
                    </div>
                    <div className="selectQues">
                        <h4>Select Questions</h4>
                    </div>
                    <div className="quseListWraper">
                    {QuesList}
                    </div>
                    <div className="footer">
                        <div className=" timeCalculate">
                            <p>Time Of Quiz {selectQues.length?": "+selectQues.length*5+ " min":" : 0 min"}</p>
                        </div>
                    <button
                    className="nextBTN"
                    onClick={nextPage}
                    >
                        Next
                    </button>

                    </div>

                </div>
            </div>

        </>
    )
}

export default LandingPage;