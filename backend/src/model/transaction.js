import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
    {
        portfolio: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Portfolio',
            required: true,
            index: true
        },
        type:{
            type: String,
            enum: ['BUY', 'SELL'],
            required: true
        },
        ticker: {
            type: String,
            required: true,
            uppercase: true,
            index: true
        },
        qty: {
            type: Number,
            required: true,
            min:0.0000001
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        date:{
            type: Date,
            default: Date.now
        },
        notes: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

const transaction = mongoose.model('Transaction', transactionSchema);

export default transaction;