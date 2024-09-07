import mongoose from "mongoose"

export const connectDB = async () => {
  await mongoose.connect('mongodb+srv://Sadia22551:Citrus1234!@cluster0.on0l0.mongodb.net/fresh-bite').then(() => console.log("DB Connected"));
}