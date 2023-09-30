import { HashRouter, Routes, Route, } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import QuestionPage from "./pages/questionPage";

function App() {


  return (
    <>
         <HashRouter>
              <Routes>
                
              <Route exact path ='/' element={<LandingPage/>}/>
              <Route exact path ='/questions' element={ <QuestionPage/>}/>
              
              </Routes>
        </HashRouter>

    </>
  );
}

export default App;
