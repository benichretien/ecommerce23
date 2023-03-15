import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";
import AdminMenu from "../../components/nav/AdminMenu";

export default function AdminProduct (){
    const [auth, setAuth]= useAuth();
    return <>
       <Jumbotron title={`Hello ${auth?.user?.name}`} subtitle="Admin Dashboard"/>
       
       <div className="container-fluid">
         <div className="row">
             <div className="col-md-3">
                <AdminMenu/>
             </div>
             <div className="col-md-9">
                <div className="p-3 mt-2 mb-2 h4 bg-light">Creer des produits</div>
                <p>Creer un produit....</p>
             </div>
         </div>
       </div>
    </>
}