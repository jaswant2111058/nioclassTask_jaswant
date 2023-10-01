import { useState, useEffect } from "react";
import MathJax from "better-react-mathjax/MathJax";

const Mathjax = ({quesID}) => {

    console.log(quesID)
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await fetch(`https://0h8nti4f08.execute-api.ap-northeast-1.amazonaws.com/getQuestionDetails/getquestiondetails?QuestionID=${quesID}`);
      const data = await res.json();
      setData(data);
    })();
  },[quesID]);

  console.log(data)
  return (
    <div>
      {data.map((prop) => (
        <MathJax style={{maxWidth: "100vw", overflow:"hidden"}} key={prop.QuestionID}>{prop.Question}</MathJax>
      ))}
    </div>
  );
};

export default Mathjax;