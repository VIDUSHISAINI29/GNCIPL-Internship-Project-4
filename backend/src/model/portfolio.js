import mongoose from 'mongoose';

const portfolioSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true
        },
        name: {
            type: String,
            required: true, 
            trim: true
        },
        baseCurrency: {
            type: String,
            default: 'USD',
            required: true
        },
        inventoryMethod:{
            type: String,
            enum: ['FIFO', 'AVERAGE'],
            default: 'FIFO'
        },
    },
    {
        timestamps: true
    }
);

const portfolio = mongoose.model('Portfolio', portfolioSchema);

export default portfolio;