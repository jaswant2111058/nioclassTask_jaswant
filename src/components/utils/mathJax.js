import { useState, useEffect } from "react";
import MathJax from "better-react-mathjax/MathJax";

const Mathjax = ({quesId}) => {

  const [data, setData] = useState([]);
  useEffect(() => {
   const  getData= async () => {
      const res = await fetch(`https://0h8nti4f08.execute-api.ap-northeast-1.amazonaws.com/getQuestionDetails/getquestiondetails?QuestionID=${quesId}`);
      const data = await res.json();
      setData(data);
    }
     getData();
  },[quesId]);
  return (
    <div>
      {data.map((items) => (
        <MathJax key={items.QuestionID}>{items.Question}</MathJax>
      ))}
    </div>
  );
};

export default Mathjax;