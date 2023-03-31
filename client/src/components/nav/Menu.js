import {NavLink} from "react-router-dom";
import {useAuth} from "../../context/auth";
import {useNavigate} from "react-router-dom";
import logo from "../cards/logo.png";
import Search from "../forms/Search";
import useCategory from "../../hooks/useCategory";

export default function Menu(){
  //context
  const [auth, setAuth] = useAuth();
  //hooks
  const categories = useCategory();
  const navigate = useNavigate();
  
  const logout = () => {
    setAuth({...auth, user: null, token: ""})
    window.localStorage.removeItem("auth");
    navigate("/login");
  }
    return <>
       <div className="header"><h1 className="headword">LIVRAISON GRATUITE - COMMANDER AUJOURD'HUI</h1></div>
       <ul className="nav d-flex justify-content-between shadow-sm mb-2 mt-2">
         <img src={logo} alt="Logo" className="logo"/>
         <li className="nav-item">
           <NavLink className="nav-link active" aria-current="page" to="/">HOME</NavLink>
         </li>

         <li className="nav-item">
           <NavLink className="nav-link active" aria-current="page" to="/shop">PRODUITS</NavLink>
         </li>


         <div className="dropdown">
             <li style={{marginTop:"21px"}}>
                <a className="nav-link pointer dropdown-toggle" data-bs-toggle="dropdown">
                 Categories
                </a>
                <ul className="dropdown-menu" style={{height:"300px", overflow:"scroll"}}>

                    <li>
                      <NavLink className="nav-link" to="/categories">
                        Tous les categories
                      </NavLink>
                    </li>

                   {categories?.map(c => (<li>
                     <NavLink className="nav-link" to={`/category/${c.slug}`}>
                      {c.name}
                     </NavLink></li>))
                    }
                </ul> 
              </li>
             
          </div>


         <Search/>


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
                     Tableau de Bord
                    </NavLink>
                 </li>
                 <li className="nav-item">
                   <a onClick={logout} className="nav-link">Deconnexion</a>
                 </li>
                </ul> 
              </li>
             
          </div>
          )
          
        }
      </ul>
    </>
}