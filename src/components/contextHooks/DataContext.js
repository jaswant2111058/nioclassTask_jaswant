import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
const DateContext = createContext();

export const useData = () => {
  return useContext(DateContext);
};

export const DataProvider = ({ children }) => {
  
  const [isLoading, setLoading] = useState(false);
  const [user, setUser] = useState()
  const [selectQues, setQues] = useState([])
  const [position, setPosition] = useState(0);
  const [timeSpent, setTimeSpent] = useState([]);
  const [preState, setPreState] = useState(null);
  const [mathjax, setMathjax] = useState("");
  const [start,setStart] = useState(false);
  const [isfinal,setIsfinal]= useState(false)


  //---------------loading functions----------------------- 

  const startLoading = () => {
    setLoading(true);
  };

  const stopLoading = () => {
    setLoading(false);
  };

  //---------------------making desire objects from selected list--------------------
  const quesObject = [{}];
  for (let i = 0; i < selectQues.length; i++) {
    let newObj = {
      id: i,
      question: selectQues[i],
    }
    quesObject[i] = newObj;
  }
  // --------------------------api call and setting into mathjax (hook define avobe)-----------------------------------------


  useEffect(() => {
    async function changeQues(whichOne) {
      try {

        if (selectQues.length) {
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
  },[position,selectQues])



  //----------------------calculating time spent on a particular state(question)  on changing state(question)------------------- 

  useEffect(() => {

    if(start){
    
    if (preState === null) {
      setPreState(position)
    }
    if (timeSpent.length === selectQues.length) {
      setTimeSpent((items) => {
        const newItems = [...items];
        const auxObj = { ...newItems[position], enterTime: new Date() }
        newItems[position] = auxObj;
        return newItems;
      })
    }
    if ((position + preState)) {
      setTimeSpent((items) => {
        const newItems = [...items];
        const auxObj = { ...newItems[preState], timeSpent: (new Date() - newItems[preState].enterTime) + Number(newItems[preState].timeSpent), enterTime: null }
        newItems[preState] = auxObj;
        return newItems;
      })
    }

    if (!timeSpent[position]) {
      const auxObj = {
        id: position,
        question:selectQues[position],
        enterTime: new Date(),
        timeSpent: 0
      }
      setTimeSpent((items) => {
        const newItems = [...items];
        newItems[position] = auxObj;
        return newItems;
      })
    }
    setPreState(position)

  }
  }, [position,start])

  //----------------saving in local storage ---------------------------------

 




  // ---------------final submit function--------------------------------  
  function submit() {
    setTimeSpent((items) => {
      const newItems = [...items];
      const auxObj = { ...newItems[position], timeSpent: (new Date() - newItems[position]?.enterTime?newItems[position].enterTime:0) + newItems[position]?.timeSpent?newItems[position].timeSpent:0, enterTime: null }
      newItems[position] = auxObj;
      return newItems;
    })
  }


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
      position,
      submit,
      quesObject,
      timeSpent,
      setStart,
      isfinal,
      setIsfinal,
      preState

    }}>
      {children}
    </DateContext.Provider>
  );
};