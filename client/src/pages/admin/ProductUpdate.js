import { useAuth } from "../../context/auth";
import { useState, useEffect } from "react";
import Jumbotron from "../../components/cards/Jumbotron";
import AdminMenu from "../../components/nav/AdminMenu";
import axios from "axios";
import { Select } from 'antd';
import { toast } from "react-hot-toast";
import { useNavigate, useParams} from "react-router-dom";

const {Option} = Select;

export default function AdminProductUpdate (){
    const [auth, setAuth]= useAuth();
    //state
    const [categories, setCategories]= useState([]);
    const [photo, setPhoto] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [shipping, setShipping]= useState("");
    const [quantity, setQuantity]= useState("");
    const [id, setId] = useState("");
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        loadProduct();

    }, [])

    const loadProduct = async () => {
        try {
            const {data} = await axios.get(`/product/${params.slug}`);
            setName(data.name);
            setDescription(data.description);
            setPrice(data.price);
            setCategory(data.category._id);
            setShipping(data.shipping);
            setQuantity(data.quantity);
            setId(data._id);
            
        } catch (error) {
            console.log(error)
            
        }
    }

    useEffect(()=>{
      loadCategories();
    }, [])

    const loadCategories = async ()=>{
      try {
         const {data} = await axios.get("/categories");
         setCategories(data)
      } catch (error) {
         console.log(error)
      }
    }

    const handleDelete = async (req, res) => {
        try {
            let answer = window.confirm("Voulez-vous vraiment supprimez ce produit ?")
            if(!answer) return;
            const {data} = await axios.delete(`/product/${id}`);
            toast.success(`"${data.name}" est supprime`);
            navigate("/dashboard/admin/products")
            
        } catch (error) {
            console.log(error)
            toast.error("echec pour la suppression. Essayez de nouveau!")
        }
    }



    const handleSubmit = async(e) => {
      e.preventDefault();
      try {
        const productData = new FormData();
        photo && productData.append("photo", photo);
        productData.append("name", name);
        productData.append("description", description);
        productData.append("price", price);
        productData.append("category", category);
        productData.append("shipping", shipping);
        productData.append("quantity", quantity);
        
        const {data} = await axios.put(`/product/${id}`, productData);
        if(data?.error){
          toast.error(data.error)
        }else {
          toast.success(`"${data.name}" est mis a jour`);
          navigate("/dashboard/admin/products")
          

        }
        
      } catch (error) {
        console.log(error)
        toast.error("echec de la creation du produit. Essayez de nouveau")
      }

    }



    return <>
       <Jumbotron title={`Hello ${auth?.user?.name}`} subtitle="Admin Dashboard"/>
       
       <div className="container-fluid">
         <div className="row">
             <div className="col-md-3">
                <AdminMenu/>
             </div>
             <div className="col-md-9">
                <div className="p-3 mt-2 mb-2 h4 bg-light">Mise a jour d'un produit</div>

                {photo ? <div className="text-center">

                  <img src={URL.createObjectURL(photo)} 
                  alt="photo de produit" 
                  className="img img-responsive"
                  height="200px"
                  />
                  
                  </div> : <div className="text-center">
                     <img src={`${process.env.REACT_APP_API}/product/photo/${id}?${new Date().getTime()}`}
                      alt="produit photo" className="img img-responsive" height="200px"
                     />
                    </div>}




                <div className="pt-2">
                  <label className="btn btn-outline-secondary col-12 mb-3">
                     {photo ? photo.name : "Telecharger la photo"}
                   <input type="file" name="photo" accept="image/*" 
                   onChange={e => setPhoto(e.target.files[0])} hidden
                   />
                  </label>
                </div>

                <input type="text" className="form-control p-2 mb-3" placeholder="ecrire un nom" value={name} onChange={(e) => setName(e.target.value)}/>
                <textarea type="text" 
                className="form-control p-3 mb-3" 
                placeholder="ecrire une description" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
                />

                <input type="number" 
                className="form-control p-2 mb-3" 
                placeholder="entrez un prix" 
                value={price} 
                onChange={(e) => setPrice(e.target.value)}
                />




                <Select bordered={false} size="large" className="form-select mb-3" placeholder="choisis une categorie"
                 onChange={(value) => setCategory(value)} value={category}
                >
                  {categories?.map((c)=><Option key={c._id} value={c._id}>{c.name}</Option>)}
                </Select>

                <Select bordered={false} size="large" className="form-select mb-3" placeholder="choisir la livraison"
                 onChange={(value) => setShipping(value)} value={shipping ? "Oui" : "Non"}
                >
                  <Option value="0">Non</Option>
                  <Option value="1">Oui</Option>
                </Select>

                <input type="number" 
                min="1"
                className="form-control p-2 mb-3" 
                placeholder="entrez une quantite" 
                value={quantity} 
                onChange={(e) => setQuantity(e.target.value)}
                />

                <div className="d-flex justify-content-between">
                  <button onClick={handleSubmit} className="btn btn-primary mb-5">Mettre a jour</button>
                  <button onClick={handleDelete} className="btn btn-danger mb-5">Supprimer</button>
                </div>
             </div>
         </div>
       </div>
    </>
}