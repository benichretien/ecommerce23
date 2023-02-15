import {NavLink} from "react-router-dom";

export default function Menu(){
    return <>
       <div className="header"><h1 className="headword">LIVRAISON GRATUITE - COMMANDER AUJOURD'HUI</h1></div>
       <ul className="nav d-flex justify-content-between shadow-sm mb-2 mt-2">
         <li className="nav-item">
           <NavLink className="nav-link active" aria-current="page" to="/">HOME</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/login">CONNEXION</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/register">CREER UN COMPTE</NavLink>
        </li>
      </ul>
    </>
}