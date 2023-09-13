import { Route, Routes } from "react-router-dom";
import Signup from "./pages/user/Signup";
import Login from "./pages/user/Login";
import Home from "./pages/user/Home";
import AdminLogin from "./pages/admin/AdminLogin";
import { useSelector } from "react-redux";


function App() {
  // const adminToken = useSelector((state) => state?.adminDetail?.token)
  const userToken = useSelector((state) => state.userDetails.token)

  return (
    <div className="App">
        <Routes>
          <Route path="login" element= {userToken? <Home/>:<Login/>}/>
          <Route path="signup" element = {userToken? <Home/>:<Signup/>}/>
          <Route path="/" element = {userToken? <Home/>:<Login/>}/>
          <Route path="adminlogin" element= {<AdminLogin/>}/>
        </Routes>
    </div>
  );
}

export default App;
