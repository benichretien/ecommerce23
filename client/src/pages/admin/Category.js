import { useAuth} from "../../context/auth";
import { useState, useEffect} from "react";
import Jumbotron from "../../components/cards/Jumbotron";
import AdminMenu from "../../components/nav/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import CategoryForm from "../../components/forms/CategoryForm";
import { Modal } from "antd";

export default function AdminCategory (){
   //le contexte
    const [auth, setAuth]= useAuth();
    //le state
    const [name, setName]= useState("");
    
    const [categories, setCategories] = useState([])

    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const [selected, setSelected] = useState(null);

    const [updatingName, setUpdatingName] = useState("")

    const handleUpdate = async(e) => {
      e.preventDefault()
      try {
         const {data} = await axios.put(`/category/${selected._id}`, {name: updatingName})
         if(data?.error){
            toast.error(data.error)
         }else{
            toast.success(`"${data.name}" est mis a jour`)
            setSelected(null);
            setUpdatingName("")
            loadCategories()
            setIsModalOpen(false)
         }
         
      } catch (error) {
         console.log(error)
         toast.error("Cette categorie existe deja. Essayez de nouveau!")
      }

    }

    const handleDelete = async(e) => {
      e.preventDefault()
      try {
         const {data} = await axios.delete(`/category/${selected._id}`)
         if(data?.error){
            toast.error(data.error)
         }else{
            toast.success(`"${data.name}" est supprime!`)
            setSelected(null);
            loadCategories()
            setIsModalOpen(false)
         }
         
      } catch (error) {
         console.log(error)
         toast.error("Cette categorie est deja supprime. Essayez de nouveau!")
      }

    }




    const handleOk = () => {
    setIsModalOpen(false);
    };

    const handleCancel = () => {
    setIsModalOpen(false);
    };

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
            toast.success(`"${data.name}" a ete cree`)
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
                <CategoryForm value ={name} setValue={setName} handleSubmit={handleSubmit}/>
                <hr/>
                <div className="d-flex flex-wrap">
                     {categories.map((c) => (<div key={c._id}>
                        <button type="primary" className="btn btn-outline-primary m-3" onClick={()=>{
                           setIsModalOpen(true);
                           setSelected(c);
                           setUpdatingName(c.name);
                        }}>
                           {c.name}
                        </button>
                     </div>))}
                </div>
                <Modal title="Mise a jour de la categorie" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
                  <CategoryForm value ={updatingName} setValue={setUpdatingName} 
                  handleSubmit={handleUpdate} buttonText="Mise a jour" handleDelete={handleDelete}/>
                </Modal>
             </div>
         </div>
       </div>
    </>
}