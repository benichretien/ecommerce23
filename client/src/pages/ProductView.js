import { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Badge } from "antd";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import ProductCard from "../components/cards/ProductCard";
import {
    FaDollarSign,
    FaProjectDiagram,
    FaRegClock,
    FaCheck,
    FaTimes,
    FaWarehouse,
    FaRocket,
  } from "react-icons/fa";

export default function ProductView() {
    //context
  
    //state
    const [product, setProduct] = useState({});
    const [related, setRelated] = useState([]);
    //hooks
    const params = useParams();

    useEffect(() => {
        if (params?.slug) loadProduct();
    }, [params?.slug]);

    const loadProduct = async () => {
        try {
            const { data } = await axios.get(`/product/${params.slug}`);
            setProduct(data);
            loadRelated(data._id, data.category._id);
        } catch (error) {
          console.log(error);

        }

    };

    const loadRelated = async (productId, categoryId) => {
        try {
          const { data } = await axios.get(
            `/related-products/${productId}/${categoryId}`
          );
          setRelated(data);
        } catch (err) {
          console.log(err);
        }
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-9">
                    <div className="card mb-3 hoverable">
                        <Badge.Ribbon text={`${product?.sold} vendu`} color="red">
                            <Badge.Ribbon text={`${product?.quantity >= 1 ? `${product?.quantity - product?.sold} En stock` : "Hors stock"}`}
                                placement="start" color="green"
                            >
                                <img src={`${process.env.REACT_APP_API}/product/photo/${product._id}`}
                                    alt={product.name}
                                    className="card-img-top"
                                    style={{ height: "500px", width:"100%", objectFit: "cover", marginTop: "1px" }} />
                            </Badge.Ribbon>
                        </Badge.Ribbon>

                        <div className="card-body">
                            <h5 className="fw-bold">{product?.name}</h5>

                            <p className="card-text lead">{product?.description}...</p>
                        </div>

                        <div className="d-flex justify-content-between lead p-5 bg-light fw-bold">
                            <div>
                                <p><FaDollarSign/> Prix: {" "} {product?.price?.toLocaleString("en-US", {style: "currency", currency: "CAD",})}</p>

                                <p><FaProjectDiagram /> Categorie: {product?.category?.name}</p>

                                <p><FaRegClock /> Ajoute: {moment(product.createdAt).fromNow()}</p>

                                <p>
                                  {product?.quantity > 0 ? <FaCheck /> : <FaTimes />}{" "}
                                  {product?.quantity > 0 ? "En Stock" : "Stock epuise"}
                                </p>

                                <p>
                                   <FaWarehouse /> Disponible {product?.quantity - product?.sold}
                                </p>

                                <p>
                                  <FaRocket /> Vendu {product.sold}
                                </p>
                            </div>
                        </div>

                        <button className="btn btn-outline-primary col card-button" style={{ borderBottomRightRadius: "5px", borderBottomLeftRadius: "5px"}}>
                            Ajouter au panier
                        </button>

                    </div>

                </div>

                <div className="col-md-3">
                 <h2>Produits Relatifs</h2>
                 <hr/>
                    
                </div>

            </div>
        </div>
    )

}