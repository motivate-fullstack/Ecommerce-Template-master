import jwt from 'jsonwebtoken';
import User from '../models/user_Schema.js'
import Products from '../models/products_Schema.js'
export const generateToken = (user) => {
    return jwt.sign(
        {
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
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '30d'
        }
    );
};

export const newID = async (type) => {
    try {
        const allID = [];
        let lastData;
        switch (type) {
            case 'user':
                lastData = await User.find().sort({ _id: -1 });
                break;
            case 'product':
                lastData = await Products.find().sort({ _id: -1 });
                break;
            default:
                break;
        }
        if (lastData != null) {
            lastData.forEach(data => {
                allID.push(data.id);
            });
            const lastId = (Math.max(...allID));
            let newId;
            if (lastId > 0) {
                newId = lastId + 1;
            } else {
                newId = 1;
            }
            return newId;
        }
    } catch (error) {
        console.log(error.stack);
    }
};

export const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (authorization) {
        jwt.verify(
            authorization,
            process.env.JWT_SECRET,
            (err, decode) => {
                if (err) {
                    res.status(401).send({ message: 'Invalid Token' });
                } else {
                    req.user = decode;
                    next();
                }
            }
        );
    } else {
        res.status(401).send({ message: 'No Token' });
    }
};