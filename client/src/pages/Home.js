import Jumbotron from "../components/cards/Jumbotron";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home(){
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

    return (
        <div>
            <Jumbotron title="Hello client"/>

            
            
        </div>
    )
}