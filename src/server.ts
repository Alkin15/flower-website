import "reflect-metadata";
import {createConnection} from "typeorm";
import express from "express"
import morgan from "morgan";
import trim from "./middleware/trim";
import dotenv from "dotenv"
import cookieparser from "cookie-parser";
import cors from "cors";

dotenv.config()

import authRoutes from './routes/auth'
import shopRoutes from './routes/shops'
import flowerRoutes from './routes/flower'
 


const app = express()
const PORT = process.env.PORT;

app.use(express.json())
app.use(morgan('dev'))
app.use(trim)
app.use(cookieparser())
app.use(cors({
    credentials:true,
    origin: process.env.ORIGIN,
    optionsSuccessStatus: 200,
}))

app.get("/", (_,res) => res.send("Hello World"))

app.use('/api/auth', authRoutes)
app.use('/api/flower', flowerRoutes)
app.use('/api/shop', shopRoutes)



app.listen(PORT, async () => {
    console.log(`Server running at http://localhost:${PORT}`)

    try {
        await createConnection()
        console.log("Database Connected")
    } catch (error) {
        console.log(error)
    }
})