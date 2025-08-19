import mongoose from 'mongoose';




export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected successfully.");
    } catch (error) {
        console.log("Error in connecting mongo db",error);
        process.exit(1);
    }
}