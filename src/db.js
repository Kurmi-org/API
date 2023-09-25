import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        mongoose.connect('mongodb+srv://kurmiproyect:iQE9cSYI7zzrxbgL@kurmiproyect.88vskcw.mongodb.net/kurmiproyect?retryWrites=true&w=majority');
        //mongoose.connect('mongodb://localhost:27017/proyect');
        console.log("DB connected");
    } catch (error) {
        console.log(error);
        throw Error("DB Error");
    }
    };
