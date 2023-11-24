import mongoose from "mongoose";

const productsModel = new mongoose.Schema({
    name: {type: String, required: true, trim: true},
    description: {type: String, required: true, trim: true},
    price : {type: Number, required: true},
    //cantidad de producto disponible
    stock : {type: Number, required: true},
    unit : {type: String, required: true, trim: true},
    images: [{
        type: String,
        required: true,
        trim: true,
        unique: true
    }],
    type : {type: String, required: true, trim: true},
    readyForSale : {type: Date, required: true},
    status : {type:Number, default: 1},
    date_created : {type: Date, default: Date.now},
    date_updated : {type: Date, default: Date.now}, 
    producer : {type: mongoose.Schema.Types.ObjectId, ref: 'persons'}
});

export default mongoose.models.products || mongoose.model('products', productsModel);