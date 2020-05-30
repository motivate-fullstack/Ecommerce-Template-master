import { Schema, model } from "mongoose";

const products_Schema = new Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    articulo: { type: String, required: true },
    caract: { type: String, required: true },
    size: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    description: { type: String, required: true },
    shortDescription: { type: String, required: true },
    img: { type: String, required: true },
    valid: { type: Boolean, required: true },
},
    {
        timestamps: true
    });

const Products = model('products_Schema', products_Schema, 'Products');

export default Products;