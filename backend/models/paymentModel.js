const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
    {
        orderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'order',
            required: true,
        },
        paymentMethod: {
            type: String,
            required: true,
        },
        paymentStatus: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        transactionId: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: false },
    }
);


const paymentModel = mongoose.model('payment', paymentSchema);

module.exports = paymentModel;
