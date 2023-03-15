import { useAuth} from "../../context/auth";
import { useState, useEffect} from "react";
import Jumbotron from "../../components/cards/Jumbotron";
import AdminMenu from "../../components/nav/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";

export default function AdminCategory (){
   //le contexte
    const [auth, setAuth]= useAuth();
    //le state
    const [name, setName]= useState("");
    
    const [categories, setCategories] = useState([])

    useEffect(()=>{
      loadCategories();
    }, []);

    const loadCategories = async ()=>{
      try {
         const {data} = await axios.get("/categories");
         setCategories(data)
      } catch (error) {
         console.log(error)
      }
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      try{
         const {data} = await axios.post("/category", {name});
         if(data?.error) {
            toast.error(data.error)
         }else{
            loadCategories();
            setName("");
            toast.success(`"${data.name}" is created`)
         }

      } catch (err){
         console.log(err)
         toast.error("Creation de categorie echoue. Essayez de nouveau!")
      }
    }
    return <>
       <Jumbotron title={`Hello ${auth?.user?.name}`} subtitle="Admin Tableau de bord"/>
       
       <div className="container-fluid">
         <div className="row">
             <div className="col-md-3">
                <AdminMenu/>
             </div>
             <div className="col-md-9">
                <div className="p-3 mt-2 mb-2 h4 bg-light">Gerer les categories</div>
                <div className="p-3">
                  <form onSubmit={handleSubmit}>
                     <input type="text" className="form-control p-3"
                     placeholder="ecris le nom de la categorie"
                     value={name}
                     onChange={(e) => setName(e.target.value)}/>
                     <button className="btn btn-primary mt-3">Soumettre</button>
                  </form>
                </div>
                <hr/>
                <div className="d-flex flex-wrap">
                     {categories.map((c) => (<div key={c._id}>
                        <button className="btn btn-outline-primary m-3">
                           {c.name}
                        </button>
                     </div>))}
                </div>
             </div>
         </div>
       </div>
    </>
}