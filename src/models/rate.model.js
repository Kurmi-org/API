
import mongoose from "mongoose";

const rateModel = new mongoose.Schema({
    increment: {type: Number, required: true},
    date_created : {type: Date, default: Date.now},
    date_updated : {type: Date, default: Date.now}
});

export default mongoose.models.rates || mongoose.model('rates', rateModel);