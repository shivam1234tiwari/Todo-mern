import mongoose from "mongoose";

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('Connected Database');
    }catch(error){
        console.error('error',error.message);
    }
}
export default connectDB;