import {Router} from "express";
import Products from "../models/products_Schema.js";

const productRouter = Router();

productRouter.get('/', async (req, res) => {
    const products = await Products.find({});
    res.send(products);
});


productRouter.get('/:id', async (req, res) => {
    const product = await Products.find({ id: req.params.id });
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

export default productRouter;