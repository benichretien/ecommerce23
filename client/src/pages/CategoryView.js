import { useState, useEffect } from "react";
import Jumbotron from "../components/cards/Jumbotron";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import ProductCard from "../components/cards/ProductCard";

export default function CategoryView() {
  //state
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});
  //hooks
  const navigate = useNavigate();
  const params = useParams();

  useEffect(()=> {
    if (params?.slug) loadProductsByCategory();
  }, [params?.slug])

  const loadProductsByCategory = async () => {
    try {
      const {data} = await axios.get(`/products-by-category/${params.slug}`);
      setCategory(data.category);
      setProducts(data.products)
    } catch (error) {
        console.log(error)
    }
  };

  return (
    <>
      <Jumbotron title={category?.name} subtitle={`${products?.length} produits trouves dans ${category?.name}`}/>

      <div className="container-fluid">
        hghghghg
      </div>
    </>
  );
}