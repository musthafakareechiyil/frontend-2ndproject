import { Navigate, Route, Routes } from "react-router-dom";
import Signup from "./pages/user/Signup";
import Login from "./pages/user/Login";
import Home from "./pages/user/Home";
import AdminLogin from "./pages/admin/AdminLogin";
import { useSelector } from "react-redux";


function App() {
  const adminToken = useSelector((state) => state?.adminDetail?.token)
  const userToken = useSelector((state) => state?.userDeails?.token)
  return (
    <div className="App">
        <Routes>
          <Route path="user/login" element= {<Login/>}/>
          <Route path="user/users" element = {<Signup/>}/>
          <Route path="user" element = {<Home/>}/>
          <Route path="admin/login" element= {<AdminLogin/>}/>
        </Routes>
    </div>
  );
}

export default App;
