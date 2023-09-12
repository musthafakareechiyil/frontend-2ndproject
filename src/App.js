import { Route, Routes } from "react-router-dom";
import Signup from "./pages/user/Signup";
import Login from "./pages/user/Login";
import Home from "./pages/user/Home";
import AdminLogin from "./pages/admin/AdminLogin";

function App() {
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
