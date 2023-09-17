import mongoose from "mongoose";

const producerSchema = new mongoose.Schema({
    name: {type: String, required: true, trim: true},
    last_names: {type: String, required: true, trim: true},
    ci : {type: String, required: true, trim: true},
    user : {type: String, required: true, trim: true, unique: true},
    password : {type: String, required: true},
    rol : {type: Number, default: 2},
    date_birth : {type: Date, required: true},
    location : {
        departament : {type: String, required: true, trim: true},
        province : {type: String, required: true, trim: true},
        address : {type: String, required: true,},
        latitude : {type: String, required: true},
        longitude : {type: String, required: true,},
    },
    phone : {type: Number, required: true, trim: true},
    email : {type: String, required: true, trim: true, unique: true},
    status : {type:Number, default: 1},
    date_created : {type: Date, default: Date.now},
    date_updated : {type: Date, default: Date.now}

})