import 'dotenv/config.js' //importing .env (MUST be the first line)

import express from 'express'
import cors from 'cors'
import {connectDB} from './config/db.js'
import foodRouter from './routes/foodRoute.js'
import userRoute from './routes/userRoutes.js'
import cartRoute from './routes/cartRoutes.js'
import orderRouter from './routes/orderRoutes.js'

//app config
const app= express()
const port= process.env.PORT || 4000;

//middleware 
app.use(express.json())
app.use(cors())

//DB
connectDB(); 


//Api endpoint 
app.use("/api/food", foodRouter )
app.use("/images", express.static('uploads'))//To show the image 
app.use("/api/user", userRoute )
app.use("/api/cart", cartRoute )
app.use("/api/order", orderRouter )


app.get("/", (req, res )=>{
    res.send("API is working..")
})

app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port} `)
})

// mongodb+srv://aman_db_user:aman_1234@cluster0.icypq3d.mongodb.net/?
