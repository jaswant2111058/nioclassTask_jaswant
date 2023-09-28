import { useData } from "../components/contextHooks/DataContext";
import { QuestionsId } from "../components/utils/questinsList";
import "./style.css"


const LandingPage = () => {

    const { user, setUser, setQues, selectQues } = useData();

    function handleChange(e) {
        setUser(e.target.value)
    }
    function handleClick(e) {
        setQues([...selectQues, e.target.value])
    }
    const QuesList = QuestionsId.map((items) => {

        return (

            <div className="quseList" key={items}>
               
                <p>{items}</p>
                <input
                    type="radio"
                    value={items}
                    onClick={handleClick}
                />
                
            </div>
        )
    })

    return (
        <>

            <div className="landingMain">
                <div className="landing">
                    <div className="user_name">
                        <input
                            name="userName"
                            value={user}
                            placeholder="Enter User Name"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="selectQues">
                        <p>Select Questions</p>
                    </div>
                    {QuesList}

                    <div className="footer">

                        <div timeCalculate>

                            <p>Time Of Quiz {selectQues.length?": "+selectQues.length*5+ " min":""}</p>

                        </div>

                    <button className="nextBTN">
                        Next
                    </button>

                    </div>

                </div>
            </div>

        </>
    )
}

export default LandingPage;