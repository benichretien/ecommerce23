import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Toaster} from "react-hot-toast";
import Home from "./pages/auth/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Menu from "./components/nav/Menu";
import AdminCategory from "./pages/admin/Category";
import AdminProduct from "./pages/admin/Product";
import AdminProducts from "./pages/admin/Products";
import UserProfile from "./pages/user/Profile";
import UserCommandes from "./pages/user/Commandes";
import Dashboard from "./pages/user/Dashboard";
import AdminProductUpdate from "./pages/admin/ProductUpdate";
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
             <Route path="user/profile" element={<UserProfile/>}/>
             <Route path="user/commandes" element={<UserCommandes/>}/>
          </Route>

          <Route path="/dashboard" element={<AdminRoute/>}>
             <Route path="admin" element={<AdminDashboard/>}/>
             <Route path="admin/category" element={<AdminCategory/>}/>
             <Route path="admin/product" element={<AdminProduct/>}/>
             <Route path="admin/products" element={<AdminProducts/>}/>
             <Route path="admin/product/update/:slug" element={<AdminProductUpdate/>}/>
          </Route>
          <Route path="*" element={<PageNotFound/>} replace/>
       </Routes>
    </BrowserRouter>
  );
}


