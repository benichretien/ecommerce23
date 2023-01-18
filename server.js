import "dotenv/config";
import mongoose from "mongoose";
import express from "express";
import AuthentificationRoute from "./routes/Authentification.js";
import router from "./routes/Authentification.js";
//create a server
const app = express();

//mongo database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
.then(()=> console.log('La base de donnee est connecte'))
.catch((err)=> console.log("DB Error ", err))

//routes
app.use('/api', AuthentificationRoute);


//listen to server
const port = process.env.PORT || 7000;
app.listen(port, ()=>{`Node Server is runnin on port: ${port}`})