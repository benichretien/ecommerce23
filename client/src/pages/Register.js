import {useState} from "react";


import Jumbotron from "../components/cards/Jumbotron";
 export default function Register() {
  const[name, setName]= useState("");
  const[email, setEmail]= useState("");
  const[password, setPassword]= useState("")
  //fonction de la form
  const handleSubmit = async(e) => {
    e.preventDefault();
    
    try{
      console.log(name, email, password);

    }catch(err){
      console.log(err);
    }
  }

    return (
      <div>
        <Jumbotron title = "Register" subtitle="registering.."/>
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
               <button className="btn btn-warning">Submit</button>
             </form>
            </div>
          </div>

        </div>
        
      </div>
    );
  }
  