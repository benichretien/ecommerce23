import User from "../models/user.js";
import { comparePassword, hashpassword } from "../helpers/auth.js";
import jwt from "jsonwebtoken";
import Order from "../models/order.js";
import dotenv from "dotenv";

dotenv.config();


export const register = async(req, res)=>{
    try{
      //recuperer le name, email, password du req body
      const{name, email, password} = req.body;
      //validation des champs
      if (!name.trim()){
        return res.json({error: "Nom est requis"})
      }
      if(!email){
        return res.json({error: "Courriel est requis"})
      }
      if(!password || password.length < 6){
        return res.json({error: "Password doit etre au moins 6 caracteres"})
      }
      // check si l'email est deja pris.
      const existinUser = await User.findOne({email: email});
      if(existinUser){
        return res.json({error: "Courriel deja pris!"})
      }
      // hash password
      const hashedPassword = await hashpassword(password);
      //enregistrer le user
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

export const secret = async (req, res)=>{
  res.json({utilisateurPresent: req.user});
}

export const updateProfile = async (req, res) => {
  try {
    const { name, password, address } = req.body;
    const user = await User.findById(req.user._id);
    // check password length
    if (password && password.length < 6) {
      return res.json({
        error: "Password is required and should be min 6 characters long",
      });
    }
    // hash the password

    const hashedPassword = password ? await hashpassword(password) : undefined;
    


    const updated = await User.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        address: address || user.address,
      },
      { new: true }
    );

    updated.password = undefined;
    res.json(updated);
  } catch (err) {
    console.log(err);
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (err) {
    console.log(err);
  }
};

export const allOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: "-1" });
    res.json(orders);
  } catch (err) {
    console.log(err);
  }
};