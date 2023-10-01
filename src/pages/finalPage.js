import "./style.css"
import { useData } from "../components/contextHooks/DataContext";
import  {useNavigate}  from 'react-router-dom';
import { useEffect } from "react";

const FinalPage = () => {

    const { user, timeSpent, selectQues,isfinal } = useData();
    const navigate = useNavigate()

    useEffect(()=>{

        if(isfinal){
            navigate("/finalsubmit")
        }
        else{
            navigate("/")
        }

    },[isfinal])


    let totalTime=0;

        timeSpent.forEach(element => {
            totalTime= totalTime+element.timeSpent
        });

    const tableData = timeSpent.map((items) => {

        return (
            <>
                <tr key={items.id}>
                    <td>
                        {items.id + 1}
                    </td>
                    <td>
                        {selectQues[items.id]}
                    </td>
                    <td>
                        {`${parseInt((items.timeSpent) / (1000 * 60))} min : ${parseInt((items.timeSpent / 1000) % 60)} sec`}
                    </td>

                </tr>


            </>
        )
    })

    return (
        <>
            <div className="finalpage">
                <div className="wraperFinal">
                    <h4>{user}</h4>
                    <div className="inner_finalpage">
                        <table className="table">
                            <tr className="trow">
                                <td><h4>Sr. No.</h4></td>
                                <td><h4>Question</h4> </td>
                                <td><h4>Time Spent</h4></td>
                            </tr>
                            {tableData}
                        </table>
                    </div>
                    <h4>Total Time : {`${parseInt((totalTime) / (1000 * 60))} min : ${parseInt((totalTime / 1000) % 60)-1} sec`}</h4>
                </div>
            </div>
        </>
    )

}


export default FinalPage