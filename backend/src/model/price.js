import mongoose from 'mongoose';

const priceSchema = new mongoose.Schema(
    {
        ticker: {
            type: String,
            required : true,
            uppercase: true,
        },
        price: {
            type: Number, 
            required: true
        },
        currency : {
            type : String,
            default: 'INR'
        },
        asOf: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

const price = mongoose.model('Price', priceSchema);

export default price;