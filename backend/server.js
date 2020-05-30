import express from "express";
import data from "./data.js";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from "./routes/seedRoutes.js";
import productRouter from './routes/productRoutes.js';
import userRouter from "./routes/userRoutes.js";
import orderRouter from "./routes/orderRoutes.js";

dotenv.config();
mongoose.connect(process.env.DB_CONNECT)
    .then(async () => {
        console.log('Connected to db');
    }).catch(async (err) => {
        console.log(`Error connecting to db...\n${err.stack}`);
    });;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//PAYPAL
app.get('/api/keys/paypal',(req,res)=>{
res.send(process.env.PAYPAL_CLIENT_ID||'sb');
});

// ROUTS
app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

//error from server
app.use((err,req,res,next)=>{
    res.status(500).send({message:err.message});
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server at http://localhost:${port}`);
});

// app.get('/api/products/:id', (req, res) => {
//     const product = data.products.filter(x => x.id == req.params.id);
//     if (product) {
//         res.send(product);
//     } else {
//         res.status(404).send({ message: 'Product Not Found' });
//     }
// });