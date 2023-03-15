import {NavLink} from "react-router-dom"

export default function AdminMenu (){
    return <>
       <div className="p-3 mt-2 mb-2 h4 bg-light">Liens d'Admin</div>

       <ul className="list-group list-unstyled">
         <li>
           <NavLink className="list-group-item" to="/dashboard/admin/category/">
              Creer une categorie
           </NavLink>
         </li>
         <li>
           <NavLink className="list-group-item" to="/dashboard/admin/product/">
              Creer un produit
           </NavLink>
         </li>
       </ul>
    </>
}