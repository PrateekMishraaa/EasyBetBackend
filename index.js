import express from "express"
const app = express()
import dotenv from "dotenv"
dotenv.config()
const PORT = process.env.PORT || 40000
import mongoose from "mongoose"
import cors from "cors"
import User from "./routes/Users.js"

app.use(cors({
  origin: 'https://easy-bet-frontend-landing-page.vercel.app',
  credentials: true
}))
app.use(express.json())
app.use('/api',User)
app.get('/',(req,res)=>{
    console.log('server started')
    res.send('hello server')
})
mongoose.connect(process.env.MONGOURI)
.then(()=>{
    console.log('server connected with database')
}).catch((error)=>{
    console.log('server disconnected with database',error)
})

app.listen(PORT,()=>console.log(`Server started at ${PORT}`))