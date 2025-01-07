import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    totalAmount: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    timestamps: true
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;