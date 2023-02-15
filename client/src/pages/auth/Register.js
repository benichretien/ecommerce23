import {useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Jumbotron from "../../components/cards/Jumbotron";

 export default function Register() {
  const[name, setName]= useState("");
  const[email, setEmail]= useState("");
  const[password, setPassword]= useState("");


  //fonction de la form
  const handleSubmit = async(e) => {
    e.preventDefault();
    
    try{
      const {data} =  await axios.post(`${process.env.REACT_APP_API}/register`, {name, email, password});
      console.log(data);
      if(data?.error){
        toast.error(data.error);
      }else{
        toast.success("Enregistrement reussi!")
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
               <button className="btn bg-couleur">Submit</button>
             </form>
            </div>
          </div>

        </div>
        
      </div>
    );
  }
  