import { HashRouter, Routes, Route, } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import QuestionPage from "./pages/questionPage";
import FinalPage from "./pages/finalPage";

function App() {


  return (
    <>
         <HashRouter>
              <Routes>
                
              <Route exact path ='/' element={<LandingPage/>}/>
              <Route exact path ='/questions' element={ <QuestionPage/>}/>
              <Route exact path ='/finalsubmit' element={ <FinalPage/>}/>
              
              </Routes>
        </HashRouter>

    </>
  );
}

export default App;
