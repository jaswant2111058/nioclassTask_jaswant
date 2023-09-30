import React, { createContext, useContext,useState,useEffect} from 'react';
import axios from 'axios';
const DateContext = createContext();

export const useData = () => {
  return useContext(DateContext);
};

export const DataProvider = ({ children }) => {

  const [isLoading, setLoading] = useState(false);
  const [user,setUser]=useState([])
  const [selectQues,setQues]= useState([])
  const [position, setPosition] = useState(0);
  const [mathjax, setMathjax] = useState("")

    let quesObject = [{}];

  for (let i = 0; i < selectQues.length; i++) {
      let newObj = {
          id: i,
          question: selectQues[i]
      }
      quesObject[i] = newObj;
  }
 

  const startLoading = () => {
    setLoading(true);
  };

  const stopLoading = () => {
    setLoading(false);
  };

  useEffect(() => {
    async function changeQues(whichOne) {
        try {

            if(selectQues.length){
                const res = await axios.get(`https://0h8nti4f08.execute-api.ap-northeast-1.amazonaws.com/getQuestionDetails/getquestiondetails?QuestionID=${quesObject[whichOne].question}`)
                if (!res) {
                    window.alert("something went wrong")
                }
                else {
                    let ques = res.data[0].Question
                    setMathjax(ques)
                    
                }
            }
            }
        
        catch (err) {
            console.log(err)
        }
    }
       changeQues(position)
})

  useEffect(()=>{

    
    
  })


  return (
    <DateContext.Provider value={{
       isLoading, 
       startLoading, 
       stopLoading,
       user,
       setUser,
       selectQues,
       setQues,
       mathjax,
       setPosition,
       position
       }}>
      {children}
    </DateContext.Provider>
  );
};