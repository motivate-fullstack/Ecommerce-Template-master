import express from "express";
import Orders from "../models/orders_Schema.js";
import expressAsyncHandler from "express-async-handler";
import { isAuth } from "../utils/utils.js";


const orderRouter = express.Router();

//create New Order
orderRouter.post('/new-order', isAuth, expressAsyncHandler(async (req, res) => {
    const newOrder = new Orders({
        orderCode: req.body.orderCode,
        orderItems: req.body.productList.map((x) => ({ ...x, product: x._id })),
        shippingAddress: req.body.shippingAddress,
        billingAddress: req.body.billingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.body._id,
    });

    const order = await newOrder.save();
    res.status(201).send({ message: 'New Order Created', order });

}));

//GET ORDER INFO
orderRouter.get('/:id', isAuth, expressAsyncHandler(async (req, res) => {
    try {
        console.log('aca');
        const order = await Orders.findById(req.params.id);
        if (order) {
            res.send(order);
        } else {
            res.status(404).send({ message: 'ORDEN NO ENCONTRADA' });
        }
    } catch (error) {
        console.log(error);
        res.status(404).send({ message: 'ERROR BUSCANDO ORDEN.' });
    }
}));

//PAY ORDER PAY
orderRouter.get('/:id/pay', isAuth, expressAsyncHandler(async (req, res) => {
    try {
        const order = await Orders.findById(req.params.id);
        if (order) {
            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.email_address,
            };
            const updatedOrder = await order.save();
            res.send({ message: 'Orden Pagada', order: updatedOrder });
        } else {
            res.status(404).send({ message: 'ORDEN NO ENCONTRADA.' });
        }
    } catch (error) {
        console.log(error);
        res.status(404).send({ message: 'ERROR PAGANDO ORDEN.' });
    }
}));



export default orderRouter;