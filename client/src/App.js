import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Toaster} from "react-hot-toast";
import Home from "./pages/auth/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Menu from "./components/nav/Menu";
import Dashboard from "./pages/user/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminRoute from "./components/routes/AdminRoute";
import PrivateRoute from "./components/routes/PrivateRoute";



const PageNotFound = () => {
   return <div className="d-flex justify-content-center align-items-center vh-100">
      404 | Page not found
   </div>
};

 export default function App() {
  return (
    <BrowserRouter>
    <Menu/>
    <Toaster/>
       <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/dashboard" element={<PrivateRoute/>}>
             <Route path="user" element={<Dashboard/>}/>
          </Route>

          <Route path="/dashboard" element={<AdminRoute/>}>
             <Route path="admin" element={<AdminDashboard/>}/>
          </Route>
          <Route path="*" element={<PageNotFound/>} replace/>
       </Routes>
    </BrowserRouter>
  );
}


