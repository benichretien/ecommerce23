import User from "../models/user.js";
import { comparePassword, hashpassword } from "../helpers/Auth.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

export const register = async(req, res)=>{
    try{
      //recuperer le name, email, password du req body
      const{name, email, password} = req.body;
      //validation des champs
      if (!name.trim()){
        return res.json({error: "Nom est requis"})
      }
      if(!email){
        return res.json({error: "Email est deja pris"})
      }
      if(!password || password.length < 6){
        return res.json({error: "Password doit etre au moins 6 caracteres"})
      }
      // check si l'email est deja pris.
      const existinUser = await User.findOne({email: email});
      if(existinUser){
        return res.json({error: "Email est deja pris"})
      }
      // hash password
      const hashedPassword = await hashpassword(password);
      //enreistrer le user
      const user = await new User({name,email,password: hashedPassword,}).save();
      //jsw
      const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d',});
      // envoyer la reponse
      res.json({
        user :{
          name: user.name,
          email: user.email,
          role: user.role,
          address: user.address,

        }, token,
      });
    }catch(err){
        console.log(err);
    }
}

export const login = async(req, res)=>{
  try{
    //recuperer le name, email, password du req body
    const{email, password} = req.body;
  
    if(!email){
      return res.json({error: "Email est deja pris"})
    }
    if(!password || password.length < 6){
      return res.json({error: "Password doit etre au moins 6 caracteres"})
    }
    // check si l'email est deja pris.
    const user = await User.findOne({email: email});
    if(!user){
      return res.json({error: "Utilisateur non trouve"})
    }
    // comparer password
    const match = await comparePassword(password, user.password);
    if(!match){
      return res.json({error: "mauvaise password"});
    }
    //jsw
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d',});
    // envoyer la reponse
    res.json({
      user :{
        name: user.name,
        email: user.email,
        role: user.role,
        address: user.address,

      }, token,
    });
  }catch(err){
      console.log(err);
  }
}