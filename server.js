import "dotenv/config";
import mongoose from "mongoose";
import express from "express";
import morgan from "morgan";
import AuthentificationRoute from "./routes/Authentification.js";

//create a server
const app = express();

//mongo database
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
.then(()=> console.log('La base de donnee est connecte'))
.catch((err)=> console.log("DB Error ", err))

// middlewares
app.use(morgan("dev"));
app.use(express.json())
//router middleware
app.use('/api', AuthentificationRoute);


//listen to server
const port = process.env.PORT || 9000;
app.listen(port, ()=>{`Node Server is runnin on port: ${port}`})