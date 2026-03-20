import express from 'express';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js';
import userRoute from './routes/user.js'
import todoRoute from './routes/todo.js'
import cors from 'cors'
const app=express();
dotenv.config();
connectDB();

const port=process.env.PORT||8000

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}));

// routes call
app.use('/api',userRoute);
app.use('/api/todo',todoRoute);

app.get('/',(req,res)=>{
    res.send('welcome')
});

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`)
})