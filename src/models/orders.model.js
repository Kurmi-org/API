import mongoose from "mongoose";

const ordersModel = new mongoose.Schema({
    date_order: {type: Date, required: true, trim: true, default: Date.now},
    quantity: {type: Number, required: true, trim: true},
    price: {type: Number, required: true, trim: true},
    status: {type: Number, default: 1},
    total : {type: Number, required: true, trim: true},
    date_created: {type: Date, default: Date.now},
    date_updated: {type: Date, default: Date.now},
    product: {type: mongoose.Schema.Types.ObjectId, ref: 'products'},
    client: {type: mongoose.Schema.Types.ObjectId, ref: 'persons'}

});

export default mongoose.model('orders', ordersModel);