import {useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Jumbotron from "../../components/cards/Jumbotron";
import { useAuth } from "../../context/auth";
import {useNavigate, useLocation} from "react-router-dom";

 export default function Login() {
  const[email, setEmail]= useState("andre@gmail.com");
  const[password, setPassword]= useState("alexbaluesi");
  // hook
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  //fonction de la form
  const handleSubmit = async(e) => {
    e.preventDefault();
    
    try{
      const {data} =  await axios.post(`/login`, {email, password});
      console.log(data);
      if(data?.error){
        toast.error(data.error);
      }else{
        window.localStorage.setItem("auth", JSON.stringify(data));
        setAuth({...auth, token: data.token, user: data.user})
        toast.success("Connexion reussi!")
        navigate(location.state || "/dashboard");
      }

    }catch(err){
      console.log(err);
      toast.error("Echec de connexion. Veuillez reessayer!")
    }
  }
    return (
      <div>
        <Jumbotron title = "Connexion" subtitle="Animago!"/>
        <div className="container">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <form onSubmit={handleSubmit}>
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
  