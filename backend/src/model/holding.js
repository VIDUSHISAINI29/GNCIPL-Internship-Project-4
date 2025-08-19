import mongoose from "mongoose";

const lotSchema = new mongoose.Schema(
    {
        qty: {
            type: Number,
            required: true
        },
        price: {
            type: Number,         //price per share at buy
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        },
    },
    {
        _id: false
    }
);

const holdingSchema = new mongoose.Schema(
    {
        portfolio : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Portfolio',
            required: true,
            index: true
        },
        ticker:{
            type: String,
            required: true,
            uppercase: true,
            index: true
        },
        qty: {
            type: Number,
            required: true, 
            default: 0
        },
        avgBuyPrice: {
            type: Number,
            required: true,
            default: 0
        },
        realizedPnl:{
            type: Number,
            required: true,
            default: 0
        },
        stockSymbol: {
            type: String
        },
        lots: {
            type: [lotSchema],
            default: []         //FIFO
        }

    },
    {
        timestamps: true
    }
);

holdingSchema.index({portfolio: 1, ticker: 1},{unique: true});

const holding = mongoose.model('Holding', holdingSchema);

export default holding;