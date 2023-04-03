import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";
import Jumbotron from "../components/cards/Jumbotron";
import { useNavigate } from "react-router-dom";
import moment from "moment";

export default function Cart(){
     // context
     const [cart, setCart] = useCart();
     const [auth, setAuth] = useAuth();
    // hooks
  const navigate = useNavigate();
  //function
  const removeFromCart = (productId) => {
    let myCart = [...cart];
    let index = myCart.findIndex((item) => item._id === productId);
    myCart.splice(index, 1);
    setCart(myCart);
    localStorage.setItem("cart", JSON.stringify(myCart));
  }

  const cartTotal = () => {
    let total = 0;
    cart.map((item) => {
        total += item.price;
    })
    return total.toLocaleString("en-US", {
        style: "currency",
        currency: "CAD"
    })
  }



    return (
        <>
          <Jumbotron title={`Hello ${auth?.token && auth?.user?.name}`} 
          subtitle={cart?.length  ? `Vous avez ${cart?.length} produits dans le chariot. ${auth?.token ? "" : "Veillez-vous connecter!"}` : "Ton chariot est vide"}/>

          <div className="container-fluid">
             <div className="row">
                 <div className="col-md-12">
                      <div className="p-3 mt-2 mb-2 h4 bg-light text-center">
                        {cart?.length ? "Mon Chariot" : <div>
                             <button className="btn btn-primary" onClick={() => navigate("/")} style={{background:"coral", border:"none", color:"black", fontWeight:"bold"}}>Retourner magasiner</button>
                            </div>}
                      </div>
                 </div>
             </div>
          </div>

          {cart?.length && (
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <div className="row"> 
                          {cart?.map((p) => (
                           <div 
                              key={p._id} 
                              className="card mb-3" 
                              //style={{maxWidth:540}}
                              >
                                <div className="row g-0">
                                    <div className="col-md-4">
                                       <img 
                                           src={`${process.env.REACT_APP_API}/product/photo/${p._id}`}
                                           alt={p.name}
                                           style={{
                                              height:"150px", 
                                              width: "150px",
                                              objectFit: "cover",
                                              marginLeft: "-12px",
                                              borderRopRightRadius: "0px",
                                            }}
                                        />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                           <h5 className="card-title">
                                              {p.name}
                                              &nbsp;&nbsp;

                                              {p?.price?.toLocaleString("en-US", {style: "currency", currency: "CAD",})}
                                           </h5>
                                           <p className="card-text">{`${p?.description?.substring(0, 50)}..`}</p>
                                           
                                        </div>
                                    </div>
                                    
                                    <div className="d-flex justify-content-between">
                                        <p className="card-text">
                                            <small className="text-muted">
                                                Publié {moment(p.createdAt).fromNow()}
                                            </small>
                                        </p>

                                        <p className="text-danger mb-2 pointer" onClick={() => removeFromCart(p._id)}>
                                            Supprimer
                                        </p>

                                    </div>
                                    
                                </div>
                           </div>))}
                        </div>
                    </div>
                    <div className="col-md-4">
                      <h4>Résumé</h4>
                      Totale /Adresse / Paiements
                      <hr/>
                      <h6>Total: {cartTotal()}</h6>
                    </div>
                    
                    
                </div>
            </div>
          )}

        </>
    )
}