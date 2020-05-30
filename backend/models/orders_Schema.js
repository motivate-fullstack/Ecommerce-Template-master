import { Schema, model } from "mongoose";

const orders_Schema = new Schema({
    orderCode: { type: String, required: true, defaul: 'unlinked' },
    orderItems: [
        {
            id: { type: Number, required: true },
            name: { type: String, required: true },
            qty: { type: Number, required: true },
            img: { type: String, required: true },
            price: { type: Number, required: true },
            product: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
        },
    ],
    shippingAddress: {
        fullName: { type: String, required: true },
        address: { type: String, required: true },
        phoneAddress: { type: String, required: false },
        city: { type: String, required: true },
        region: { type: String, required: true },
        postalCode: { type: String, required: true },
    },
    billingAddress: {
        type: { type: String, required: true },
        fullName: { type: String, required: false },
        address: { type: String, required: false },
        city: { type: String, required: false },
        region: { type: String, required: false },
        postalCode: { type: String, required: false },
    },
    paymentMethod: { type: String, required: true },
    paymentResult: {
        id: String,
        status: String,
        update_time: String,
        email_address: String,
    },
    itemsPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
},
    {
        timestamps: true
    });


const Orders = model('orders_Schema', orders_Schema, 'Orders');
export default Orders;
