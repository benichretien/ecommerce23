import Jumbotron from "../../components/cards/Jumbotron";
import axios from "axios";
import { useEffect, useState } from "react";
import ProductCart from "../../components/cards/ProductCard";



 export default function Home() {
  const [products, setProducts] = useState([])

    useEffect(()=>{
        loadProducts();
    }, [])

    const loadProducts = async () => {
        try {
            const {data} = await axios.get("/products");
            setProducts(data);
        } catch (error) {
            console.log(error)
        }
    }

    const arr = [...products];
    const sortedBySold = arr?.sort((a,b) => (a.sold < b.sold ? 1 : -1));



    return (
      <div>
        <Jumbotron title="ANIMAGO!" subtitle="Bienvenue sur votre site favoris de produits animaliers"/>

        <div className="row">
          <div className="col-md-6">
           <h2 className="p-3 mt-2 mb-2 h4 bg-light text-center">Nouvelles arrivees</h2>
           <div className="row">
             {products?.map((p) => (<div className="col-md-6" key={p._id}><ProductCart p={p}/></div>))}
           </div>
           
          </div>
          <div className="col-md-6">
            <h2 className="p-3 mt-2 mb-2 h4 bg-light text-center">Meilleures ventes</h2>
            <div className="row">
             {products?.map((p) => (<div className="col-md-6" key={p._id}><ProductCart p={p}/></div>))}
            </div>
          </div>
        </div>

        

        
        
      </div>
    );
  }
  