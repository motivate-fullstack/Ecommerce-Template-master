import express from "express";
import bcrypt from 'bcryptjs';
import User from "../models/user_Schema.js";
import expressAsyncHandler from "express-async-handler";
import { generateToken, newID } from "../utils/utils.js";


const userRouter = express.Router();

//SIGNIN
userRouter.post(
    '/signin',
    expressAsyncHandler(async (req, res) => {
        const user = await User.findOne({ email: req.body.email });
        if (user && user.valid && bcrypt.compareSync(req.body.password, user.password)) {
            res.send({
                _id: user._id,
                id: user.id,
                isAdmin: user.isAdmin, //ADMIN, CLIENT, DEV
                name: user.name,
                lastName: user.lastName,
                rut: user.rut,
                shippingAddress: user.shippingAddress,
                billingAddress: user.billingAddress,
                phone: user.phone,
                email: user.email,
                payments: user.payments,
                shopping: user.shopping,
                returns: user.returns,
                token: generateToken(user),
            });
            return;
        }
        res.status(401).send({ message: 'Email o contraseña inválidos' });
    })
);

//SIGNUP
userRouter.post(
    '/signup',
    expressAsyncHandler(async (req, res) => {
        const new_id = await newID('user');
        const newUser = new User({
            id: new_id,
            isAdmin: false, //ADMIN, CLIENT, DEV,
            password: bcrypt.hashSync(req.body.password, 11),
            name: req.body.name,
            lastName: req.body.lastName,
            email: req.body.email,
            valid: true,
        });
        const user = await newUser.save();
        res.send({
            _id: user._id,
            id: user.id,
            isAdmin: user.isAdmin, //ADMIN, CLIENT, DEV
            name: user.name,
            lastName: user.lastName,
            rut: user.rut,
            shippingAddress: user.shippingAddress,
            billingAddress: user.billingAddress,
            phone: user.phone,
            email: user.email,
            payments: user.payments,
            shopping: user.shopping,
            returns: user.returns,
            token: generateToken(user),
        });
    }));

//NEW SHIPPING ADDRESS
userRouter.post(
    '/newshipping',
    expressAsyncHandler(async (req, res) => {
        let user_in = req.body.user;
        const lastShippings = user_in.shippingAddress;

        if (lastShippings.length < process.env.MAX_SHIPPING_ADDRESS) {
            const myNewAddress = {
                alias: req.body.newAlias,
                phone: req.body.addressPhone,
                region: req.body.region,
                city: req.body.city,
                address: req.body.address,
                address2: req.body.address2,
                postalCode: req.body.postalCode,
                additional: req.body.additional,
            };
            lastShippings.push(myNewAddress);

            const filter = { id: user_in.id };
            const update = { shippingAddress: lastShippings };
            await User.findOneAndUpdate(filter, update).then(async () => {
                const user = await User.findOne(filter);
                if (user && user.shippingAddress.find(address => address.alias === req.body.newAlias)) {
                    res.send({
                        id: user.id,
                        isAdmin: user.isAdmin, //ADMIN, CLIENT, DEV
                        name: user.name,
                        lastName: user.lastName,
                        rut: user.rut,
                        shippingAddress: user.shippingAddress,
                        billingAddress: user.billingAddress,
                        phone: user.phone,
                        email: user.email,
                        payments: user.payments,
                        shopping: user.shopping,
                        returns: user.returns,
                        token: user_in.token,
                    });
                } else {
                    console.log('Error code... shipping don´t added succefully');
                    res.status(401).send({ message: 'Error... No se a actualizado la información de manera correcta.' });
                }
            }).catch(async (err) => {
                console.log(err.stack);
                res.status(401).send({ message: 'Error registrando nueva dirección en el servidor...\n\nError=> ' + err });
            });;
        } else {
            res.status(401).send({ message: 'Límite de direcciones alcanzado...' });
        }
    }));

//EDIT USER
userRouter.post(
    '/edit-user',
    expressAsyncHandler(async (req, res) => {
        try {
            const data = req.body;
            //actualizar información user
            const filter_user = { id: data.user.id };
            const actualUser = await User.findOne(filter_user);

            if (actualUser && actualUser.valid) {

                actualUser.name = data.name;
                actualUser.lastName = data.lastName;
                actualUser.rut = data.rut;
                actualUser.phone = data.phone;

                actualUser.save().then(async () => {
                    const user = await User.findOne(filter_user);
                    if (user && user.valid && user.name === data.name && user.lastName === data.lastName && user.rut === data.rut && user.phone === data.phone) {
                        res.send({
                            id: user.id,
                            isAdmin: user.isAdmin, //ADMIN, CLIENT, DEV
                            name: user.name,
                            lastName: user.lastName,
                            rut: user.rut,
                            shippingAddress: user.shippingAddress,
                            billingAddress: user.billingAddress,
                            phone: user.phone,
                            email: user.email,
                            payments: user.payments,
                            shopping: user.shopping,
                            returns: user.returns,
                            token: data.user.token,
                        });
                        return;
                    } else {
                        const text = 'Datos no actualizados';
                        console.log(text);
                        res.status(401).send({ message: `${text}...\nERROR => ${err}` });
                    }
                }).catch(async (err) => {
                    console.log(err.stack);
                    res.status(401).send({ message: `Error actualizando datos en el servidor...\nERROR => ${err}` });
                    return;
                });
                return;
            }
            res.status(401).send({ message: 'Email o contraseña inválidos' });
        } catch (error) {
            console.log(error.stack);
            res.status(401).send({ message: `Error en el servidor...\nERROR => ${error}` });
            return;
        }
    })
);


export default userRouter;