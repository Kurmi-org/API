import mongoose from "mongoose";

const productsModel = new mongoose.Schema({
    name: {type: String, required: true, trim: true},
    description: {type: String, required: true, trim: true},
    price : {type: Number, required: true},
    stock : {type: Number, required: true},
    Unit : {type: String, required: true, trim: true},
    Images: [{
        type: String,
        required: true,
        trim: true
    }],
    type : {type: String, required: true, trim: true},
    RaadyForsale : {type: Date, required: true},
    status : {type:Number, default: 1},
    date_created : {type: Date, default: Date.now},
    date_updated : {type: Date, default: Date.now}, 
    Producer : {type: mongoose.Schema.Types.ObjectId, ref: 'persons'}
})

export default mongoose.model('products', productsModel);
