import {Router} from "express";
import Products from "../models/products_Schema.js";
import User from "../models/user_Schema.js";
import data from '../data.js';

const seedRouter = Router();
seedRouter.get('/', async (req, res) => {
    await Products.deleteMany();
    const createdProducts = await Products.insertMany(data.products);

    await User.deleteMany();
    const createdUsers = await User.insertMany(data.users);

    res.send({ createdProducts, createdUsers });
});

export default seedRouter;