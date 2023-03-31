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
              {cart?.length ? (
                "My Cart"
              ) : (
                <div className="text-center">
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate("/")}
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

        </>
    )
}