import mongoose from "mongoose";

export const connectDB =async()=>{
    await mongoose.connect('mongodb+srv://aman_db_user:aman_1234@cluster0.icypq3d.mongodb.net/food-del').then(()=>{console.log("DB connected..!")})
}