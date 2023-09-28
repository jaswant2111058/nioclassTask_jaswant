import { HashRouter, Routes, Route, } from "react-router-dom";
import LandingPage from "./pages/landingPage";

function App() {
  return (
    <>
         <HashRouter>
              <Routes>
              <Route exact path ='/' element={<LandingPage/>}/>
              </Routes>
              </HashRouter>

    </>
  );
}

export default App;
