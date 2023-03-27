import { useState, useEffect } from "react"
import axios from "axios";
import Jumbotron from "../components/cards/Jumbotron";
import ProductCart from "../components/cards/ProductCard";

export default function Shop() {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

    const loadProducts = async ()=> {
        try {
            const {data} = axios.get("/products");
            setProducts(data);
        } catch (error) {
            console.log(error) 
        }
    }

    const loadCategories = async () => {
        try {
            const {data} = await axios.get("/categories");
            setCategories(data);
            
        } catch (error) {
            console.log(error)
            
        }
    }

    useEffect(()=>{
        loadCategories();
    },[])
    return (
        <>
          <Jumbotron title= "ANIMAGO!" subtitle="Bienvenue sur votre site favoris de produits animaliers"/>
        </>
    )
}