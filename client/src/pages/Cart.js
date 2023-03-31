import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";
import Jumbotron from "../components/cards/Jumbotron";
import { useNavigate } from "react-router-dom";

export default function Cart(){
     // context
     const [cart, setCart] = useCart();
     const [auth, setAuth] = useAuth();
    // hooks
  const navigate = useNavigate();
    return (
        <>
          <Jumbotron title={`Hello ${auth?.token && auth?.user?.name}`} 
          subtitle={cart?.length > 1 ? `Vous avez ${cart?.length} produits dans le chariot. ${auth?.token ? "" : "Veillez-vous connecter!"}` : "Ton chariot est vide"}/>

          <div className="container-fluid">
             <div className="row">
                 <div className="col-md-12">
                      <div className="p-3 mt-2 mb-2 h4 bg-light text-center">
                        {cart?.length > 1 ? "Mon Chariot" : <div>
                             <button className="btn btn-primary" onClick={() => navigate("/")} style={{background:"coral", border:"none", color:"black", fontWeight:"bold"}}>Retourner magasiner</button>
                            </div>}
                      </div>
                 </div>
             </div>
          </div>

          {cart?.length > 1 && (
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <div className="row"> 
                          {cart?.map((p) => (
                           <div 
                              key={p._id} 
                              className="card mb-3" 
                              style={{maxWidth:540}}
                              >
                                <div className="row g-0">
                                    <div className="col-md-4">
                                       <img 
                                           src={`${process.env.REACT_APP_API}/product/photo/${p._id}`}
                                           alt={p.name}
                                        />
                                    </div>
                                </div>
                           </div>))}
                        </div>
                    </div>
                    <div className="col-md-4">Totale /Adrese / Paiements</div>
                </div>
            </div>
          )}

        </>
    )
}