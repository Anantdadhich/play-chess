import { BrowserRouter, Route, Routes } from "react-router-dom"
import { LandingPage } from "./Screens/LandingPage"
import { GamingPage } from "./Screens/GamingPage"


function App() {
  

  return (
    <div className="h-screen bg-slate-900">
    <BrowserRouter >
      <Routes>
        <Route path="/" element={<LandingPage></LandingPage>}/>
        <Route path="/gaming" element={<GamingPage></GamingPage>}/> 

     
      </Routes>
    </BrowserRouter>
       
    </div>
  )
}

export default App
