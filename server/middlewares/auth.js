import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const requireSignin = (req, res, next)=>{
    try{
        //pour verifier le token utilise pour authentifier l'user
        const decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        //console.log("decoded =>", decoded);
        //quand le token est verifie, on peut avoir acces au valeur decode du token
        req.user = decoded;
        next();


    } catch (err){
        return res.status(401).json(err)

    }

}
// Pour verifier si l'utilisateur est admin user ou pas
export const isAdmin = async (req, res, next)=>{
    try{
        const user = await User.findById(req.user._id);
        if(user.role !== 1){
            return res.status(401).send('Non Authorise/Unauthorized')
        }else{
            next();
        }

    } catch(err){
        console.log(err)
    }
}