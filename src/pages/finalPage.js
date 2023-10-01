import "./style.css"
import { useData } from "../components/contextHooks/DataContext";

const FinalPage =()=>{

    const { user,timeSpent,selectQues} = useData();
       

    const tableData = timeSpent.map((items)=>{
        
        return(
            <>
            <tr key={items.id}>
                <td>
                    {items.id+1}
                </td>
                <td>
                    {selectQues[items.id]}
                </td>
                <td>
                    {`${parseInt((items.timeSpent)/(1000*60))} min : ${parseInt((items.timeSpent/1000)%60)} sec`}
                </td>

            </tr>


            </>
        )
    })

    return(
        <>
            <div className="finalpage">
                <div className="inner_finalpage">
                    <table className="table">
                            <tr>
                                <td>Sr. No.</td>
                                <td>Question </td>
                                <td>Time Taken</td>
                            </tr>
                            {tableData}
                    </table>
                </div>

                
            </div>
        </>
    )

}


export default FinalPage