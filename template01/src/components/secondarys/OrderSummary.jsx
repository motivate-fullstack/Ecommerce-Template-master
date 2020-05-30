import React, { useReducer } from 'react'
import LoadingBox from './LoadingBox';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { clearCart } from '../../redux/actions';
import { getError, randomId } from '../../utils/utils';
import Toasts from './toasts';
import moneyString from '../../utils/Formats';

const reducer = (state, action) => {
    switch (action.type) {
        case 'CREATE_REQUEST':
            return { ...state, loading: true };
        case 'CREATE_SUCCES':
            return { ...state, loading: false };
        case 'CREATE_FAIL':
            return { ...state, loading: false };
        default:
            return state;
    }
}

const OrderSummary = (props) => {
    const state = useSelector((state) => state.controlItems);

    const navigate = useNavigate();
    const ctxDispatch = useDispatch();
    const [{ loading }, dispatch] = useReducer(reducer, {
        loading: false,
    });

    if (props.order) {


        const procedeToPay = async (value) => {
            try {
                console.log(value);
            } catch (error) {

            }

        };
        return (
            <div className='container pt-5 '>
                <div className="container border" style={{ fontSize: '18px' }}>
                    <div className='py-2 mt-2 text-center'>
                        <h4>Resumen de Orden</h4>
                    </div>
                    <div className="row justify-content-between mx-auto pt-1">
                        <div className='col-3'>Productos:</div> <div className='col-5'>{moneyString(props.order.itemsPrice)}</div>
                        <hr />
                    </div>
                    <div className="row justify-content-between mx-auto pt-1" style={{ fontSize: '15px' }}>
                        <div className='col-3'>Impuestos:</div> <div className='col-5'>{moneyString(props.order.taxPrice)}</div>
                        <hr />
                    </div>
                    <div className="row justify-content-between mx-auto pt-1" style={{ fontSize: '15px' }}>
                        <div className='col-2'>Envío:</div> <div className='col-5'>{props.order.shippingPrice === -1 ? 'Por pagar' : props.order.shippingPrice}</div>
                        <hr />
                    </div>
                    <div className="row justify-content-end mx-auto pb-1 ">
                        <div className='col-2 fw-bold me-3'>TOTAL:</div> <div className='col-8'><strong>{moneyString(props.order.itemsPrice)}</strong> <span style={{ fontSize: '10px' }}>IVA incluido</span> </div>
                    </div>
                </div>
                {loading && <LoadingBox />}
            </div>
        );
    } else {
        const {
            cart, userInfo,
        } = state;
        cart.itemsPrice = cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0);
        cart.shippingPrice = cart.itemsPrice >= process.env.MIN_FREE_SHIPPING ? 0 : -1;
        cart.taxes = cart.itemsPrice * 0.19;
        cart.totalPrice = cart.shippingPrice !== -1 ? cart.itemsPrice + cart.shippingPrice : cart.itemsPrice;

        const createNewOrder = async (value) => {
            try {
                dispatch({ type: 'CREATE_REQUEST' });
                const myShipping = {
                    fullName: cart.shippingAddress.fullName,
                    address: cart.shippingAddress.address + (cart.shippingAddress.address2 != null && cart.shippingAddress.address2 !== '' ? `, ${cart.shippingAddress.address2}` : ''),
                    phoneAddress: cart.shippingAddress.addressPhone,
                    city: cart.shippingAddress.city,
                    region: cart.shippingAddress.region,
                    postalCode: cart.shippingAddress.postalCode,
                }
                const { data } = await axios.post(
                    '/api/orders/new-order',
                    {
                        orderCode: randomId(11),
                        productList: cart.cartItems, //ADMIN, CLIENT, DEV
                        shippingAddress: myShipping,
                        billingAddress: cart.billingAddress,
                        paymentMethod: cart.paymentMethod,
                        itemsPrice: cart.itemsPrice,
                        shippingPrice: cart.shippingPrice,
                        taxPrice: cart.taxes,
                        totalPrice: cart.totalPrice,
                        _id: userInfo._id,
                    },
                    {
                        headers: {
                            authorization: String(userInfo.token),
                        }
                    });

                dispatch({ type: 'CREATE_SUCCESS' });
                ctxDispatch(clearCart());

                localStorage.removeItem('shippingAddress');
                localStorage.removeItem('billingAddress');
                localStorage.removeItem('cartItems');
                localStorage.removeItem('paymentMethod');
                //crear orden
                switch (value) {
                    case 'transferencia':
                        navigate('/checkout/payorder/transf');
                        break;
                    case 'webpay':
                        navigate('/checkout/payorder/webpay');
                        break;
                    case 'khipu':
                        navigate('/checkout/payorder/khipu');
                        break;
                    case 'paypal':
                        navigate('/checkout/payorder/paypal');
                        break;
                    default:
                        navigate('/checkout/placeorder');
                        break;
                }
            } catch (error) {
                dispatch({ type: 'CREATE_FAIL' });
                Toasts(getError(error));
                console.log(error.stack);
            }

        };
        return (
            <div className='container pt-5 '>
                <div className="container border" style={{ fontSize: '18px' }}>
                    <div className='py-2 mt-2 text-center'>
                        <h4>Resumen de Orden</h4>
                    </div>
                    <div className="row justify-content-between mx-auto pt-1">
                        <div className='col-3'>Productos:</div> <div className='col-5'>{moneyString(cart.itemsPrice)}</div>
                        <hr />
                    </div>
                    <div className="row justify-content-between mx-auto pt-1" style={{ fontSize: '15px' }}>
                        <div className='col-3'>Impuestos:</div> <div className='col-5'>{moneyString(cart.taxes)}</div>
                        <hr />
                    </div>
                    <div className="row justify-content-between mx-auto pt-1" style={{ fontSize: '15px' }}>
                        <div className='col-2'>Envío:</div> <div className='col-5'>{cart.shippingPrice === -1 ? 'Por pagar' : cart.shippingPrice}</div>
                        <hr />
                    </div>
                    <div className="row justify-content-between mx-auto pb-1 ">
                        <div className='col-2 fw-bold'>TOTAL:</div> <div className='col-8'><strong>{moneyString(cart.itemsPrice)}</strong> <span style={{ fontSize: '10px' }}>IVA incluido</span> </div>
                    </div>
                </div>
                <div className="py-3">
                    <button className="btn btn-outline-primary btn-lg fw-bold w-100" onClick={() => { createNewOrder(cart.paymentMethod) }} style={{ fontSize: '25px' }}>PAGAR</button>
                </div>
                {loading && <LoadingBox />}
            </div>
        );
    }
}

export default OrderSummary;