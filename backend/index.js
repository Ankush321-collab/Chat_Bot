import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import botrouter from './routes/bot.routes.js'
import cors from 'cors'

const app = express()
dotenv.config()
const port = process.env.PORT || 5000

// middleware to parse json
app.use(express.json());
app.use(cors());

// mount bot routes
app.use('/api', botrouter);
const mongo=process.env.MONGO_URL
mongoose.connect(mongo,{
     useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>{
    console.log("mongoDb connected:Chat_Bot")
}).catch((error)=>{
    console.log("mongodb connection error:",error)
})
app.get("/api",botrouter)

app.get("/",(req,res)=>{
    res.send("backend is running by ankush")
})

app.listen(port,()=>{
    console.log(`server running on:${port}`)
})
