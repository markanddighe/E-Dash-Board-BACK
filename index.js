import express from 'express';
import dotenv from 'dotenv'
import mongoose from "mongoose";
import cors from "cors";
import router from '../backend/routes/User.js'

dotenv.config()
const app = express();


// midleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cors())


app.use("/",router)


app.get("/",async(req,res)=>{

    try {
        res.status(200).send("app is working");
        
    } catch (error) {
        
        res.status(400).send("error")
    }
})

const PORT=process.env.PORT||8000
// connect mongo db atlas
strictQuery: false
mongoose.connect(process.env.MONGO_URL,{usenewurlparser:true}).then(()=>{
    console.log("connected to mongodb atlas")
}).catch(error=>{
console.log("something wrong")
})

// server port
app.listen(PORT,()=>{
    console.log("server started at port http://localhost:8000");
})

