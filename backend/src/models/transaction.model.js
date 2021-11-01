import mongoose from "mongoose";

const TransactionsSchema = new mongoose.Schema({
    title: {
        type: String, trim: true,
        unique: "Title already exists",
        required: true,
    },
    amount: {
        type: Number,
    },
    currency: {
        type: String,
    },
    created: {
        type: Date,
        default: Date.now
    },
    type: { type: String },
    updated: Date,
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})


export default mongoose.model("Transactions", TransactionsSchema);