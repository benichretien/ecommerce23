import {NavLink} from "react-router-dom";
import {useAuth} from "../../context/auth";
import {useNavigate} from "react-router-dom";

export default function Menu(){
  //hook
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const logout = () => {
    setAuth({...auth, user: null, token: ""})
    window.localStorage.removeItem("auth");
    navigate("/login");
  }
    return <>
       <div className="header"><h1 className="headword">LIVRAISON GRATUITE - COMMANDER AUJOURD'HUI</h1></div>
       <ul className="nav d-flex justify-content-between shadow-sm mb-2 mt-2">
         <li className="nav-item">
           <NavLink className="nav-link active" aria-current="page" to="/">HOME</NavLink>
         </li>
         {!auth?.user ? (<>
         <li className="nav-item">
          <NavLink className="nav-link" to="/login">CONNEXION</NavLink>
         </li>
         <li className="nav-item">
          <NavLink className="nav-link" to="/register">CREER UN COMPTE</NavLink>
         </li>
         </>) : (
          <div className="dropdown">
             <li>
                <a className="nav-link pointer dropdown-toggle" data-bs-toggle="dropdown">
                 {auth?.user?.name}
                </a>
                <ul className="dropdown-menu">
                 <li>
                    <NavLink className="nav-link" to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}>
                      Dashboard
                    </NavLink>
                 </li>
                 <li className="nav-item">
                   <a onClick={logout} className="nav-link">Logout</a>
                 </li>
                </ul> 
              </li>
             
          </div>
          )
        }
      </ul>
    </>
}