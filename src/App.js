import { HashRouter, Routes, Route, } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import QuestionPage from "./pages/questionPage";
import FinalPage from "./pages/finalPage";
import { MathJaxContext } from 'better-react-mathjax';

function App() {

  const config = {
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
      <MathJaxContext config={config}>
         <HashRouter>
              <Routes>
            
              <Route exact path ='/' element={<LandingPage/>}/>
              <Route exact path ='/questions' element={ <QuestionPage/>}/>
              <Route exact path ='/finalsubmit' element={ <FinalPage/>}/>
             
              </Routes>
        </HashRouter>
        </MathJaxContext>

    </>
  );
}

export default App;
