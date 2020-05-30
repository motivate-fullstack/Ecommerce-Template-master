import { Schema, model } from "mongoose";

const user_Schema = new Schema({
    id: { type: Number, required: true, unique: true },
    isAdmin: { type: Boolean, required: true }, //ADMIN, CLIENT, DEV
    password: { type: String, required: true },
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    rut: { type: String, required: false, unique: false },
    shippingAddress: { type: Object, default: [], required: false },
    billingAddress: { type: Object, default: {}, required: false },
    phone: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    payments: { type: Object, default: {}, required: false },
    orders: { type: Array, defautl: [], required: false },
    returns: { type: Array, required: false },
    valid: { type: Boolean, required: true },
},
    {
        timestamps: true
    });


const User = model('user_Schema', user_Schema, 'Users');

const shippingAddress = [
    {
        alias: "alias",
        phone: "phone",
        country: "country",
        region: "region",
        direccion: "direccion",
        direccion2: "direccion2",
        codigo: "codigo",
        aditional: "aditional"
    }
];
export default User;