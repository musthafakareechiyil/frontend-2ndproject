import { Navigate, Route, Routes } from "react-router-dom";
import Signup from "./pages/user/Signup";
import Login from "./pages/user/Login";
import Home from "./pages/user/Home";
import AdminLogin from "./pages/admin/AdminLogin";
import { useSelector } from "react-redux";
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import UserProfile from "./pages/user/UserProfile";


function App() {
  const adminToken = useSelector((state) => state?.adminDetails?.token)
  const userToken = useSelector((state) => state?.userDetails?.token)

  return (
    <div className="App">
        <Routes>
          <Route path="login" element= {userToken? <Home/>:<Login/>}/>
          <Route path="signup" element = {userToken? <Home/>:<Signup/>}/>
          <Route path="/" element = {userToken? <Home/>:<Login/>}/>
          <Route path="admin" element= {adminToken? <Navigate to='/dashboard'/>:<AdminLogin/>}/>
          <Route path="dashboard" element = {adminToken? <Dashboard/>:<AdminLogin/>}/>
          <Route path="users" element = {adminToken? <Users/>:<AdminLogin/>}/>
          <Route path="user/profile" element = {userToken? <UserProfile/>:<Login/>}/>
        </Routes>
    </div>
  );
}

export default App;
