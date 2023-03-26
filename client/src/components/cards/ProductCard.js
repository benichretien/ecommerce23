import moment from "moment"
import { Badge } from "antd"

export default function ProductCart({p}) {
    return (
        <div className="card mb-3 hoverable">
            <Badge.Ribbon text={`${p?.sold} vendu`} color="red">
                <Badge.Ribbon text={`${p?.quantity >= 1 ? `${p?.quantity - p?.sold} En stock` : "Hors stock"}`}
                placement="start" color="green"
                >
                  <img src={`${process.env.REACT_APP_API}/product/photo/${p._id}`} 
                  alt={p.name}
                  className="card-img-top"
                  style={{height: "300px", objectFit: "cover"}}/>
                </Badge.Ribbon>
            </Badge.Ribbon>

            <div className="card-body">
              <h5>{p?.name}</h5>

              <h4 className="fw-bold">
                {p?.price?.toLocaleString("en-US", {style: "currency", currency: "CAD",})}
              </h4>



              <p className="card-text">{p?.description?.substring(0, 60)}...</p>
            </div>

            <div className="d-flex justify-content-between">
                <button className="btn btn-primary col card-button" style={{borderBottomLeftRadius: "5px"}}>
                    Voir le produit
                </button>

                <button className="btn btn-outline-primary col card-button" style={{borderBottomRightRadius: "5px"}}>Ajouter au panier</button>
            </div>



           {/*<p>{moment(p.createdAt).fromNow()}</p>
           <p>{p.sold} vendu</p>*/}
        </div>
    )
}