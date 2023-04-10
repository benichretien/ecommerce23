import {useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Jumbotron from "../../components/cards/Jumbotron";
import { useAuth } from "../../context/auth";
import {useNavigate} from "react-router-dom";

 export default function Register() {
  const[name, setName]= useState("");
  const[email, setEmail]= useState("");
  const[password, setPassword]= useState("");
  //hook
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();


  //fonction de la form
  const handleSubmit = async(e) => {
    e.preventDefault();
    
    try{
      const {data} =  await axios.post(`/register`, {name, email, password});
      console.log(data);
      if(data?.error){
        toast.error(data.error);
      }else{
        window.localStorage.setItem("auth", JSON.stringify(data));
        setAuth({...auth, token: data.token, user: data.user})
        toast.success("Enregistrement reussi!");
        navigate("/dashboard/user");

      }

    }catch(err){
      console.log(err);
      toast.error("L'enregistrement a echoue. Veuillez reessayer!")
    }
  }

    return (
      <div>
        <Jumbotron title = "Créer un compte" subtitle="Animago!"/>
        
        <div className="container">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <form onSubmit={handleSubmit}>
               <input type="text" className="form-control mb-4 p-2 mt-5" placeholder="Entrez votre nom" 
               value={name} onChange={(e)=>{
                setName(e.target.value);
               }} autoFocus/>
               

               <input type="email" className="form-control mb-4 p-2 mt-5" placeholder="Entrez votre courriel" 
               value={email} onChange={(e)=>{
                setEmail(e.target.value);
               }} autoFocus/>

               <input type="password" className="form-control mb-4 p-2 mt-5" placeholder="Entrez votre password" 
               value={password} onChange={(e)=>{
                setPassword(e.target.value);
               }} autoFocus/>
               <button className="btn bg-couleur">Soumettre</button>
             </form>
            </div>
          </div>

        </div>
        
      </div>
    );
  }
  