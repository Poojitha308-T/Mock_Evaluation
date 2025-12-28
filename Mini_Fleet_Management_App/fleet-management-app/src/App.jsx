import { BrowserRouter } from "react-router-dom";
import Login from "./Login";
import Admin from "./Admin";

function App(){
  return(
    <>
    <BrowserRouter>
    <Routes>
      <Route to="/" element={<Login/>}/>
      <Route to="/admin" element={<Admin/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}
export default App;