import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        
        mongoose.connect('mongodb+srv://kurmiproyect:iQE9cSYI7zzrxbgL@kurmiproyect.88vskcw.mongodb.net/kurmiproyect?retryWrites=true&w=majority');
        /*mongoose.connect('mongodb://127.0.0.1:27017/kurmiproyect', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
        });*/
        console.log("DB connected");
    } catch (error) {
        console.log(error);
        throw Error("DB Error");
    }
};
//mongoose.connect('mongodb+srv://kurmiproyect:iQE9cSYI7zzrxbgL@kurmiproyect.88vskcw.mongodb.net/kurmiproyect?retryWrites=true&w=majority');



   