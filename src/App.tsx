import GeneratePasscode from "./components/GeneratePasscode"
import VerifyPasscode from "./components/ValidatePasscode"
import {Routes, Route} from "react-router-dom"


function App() {


  return (
        <Routes>
          <Route path="/" element={<GeneratePasscode />} />
          <Route path="/verify" element={<VerifyPasscode />} />
        </Routes>
   
  )
}

export default App
