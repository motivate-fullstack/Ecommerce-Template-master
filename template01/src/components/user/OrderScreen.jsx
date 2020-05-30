import React, { useEffect, useReducer } from 'react'
import LoadingBox from '../secondarys/LoadingBox.js'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { MessageBox } from '../secondarys/Messages.js'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getError, randomId } from '../../utils/utils.js';
import axios from 'axios';
import OrderSummary from '../secondarys/OrderSummary.jsx';
import moneyString from '../../utils/Formats.js';
import Toasts from '../secondarys/toasts.js';

function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, order: action.payload, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };

        case 'PAY_REQUEST':
            return { ...state, loadingPay: true };
        case 'PAY_SUCCESS':
            return { ...state, loadingPay: false, sucessPay: true };
        case 'PAY_FAIL':
            return { ...state, loadingPay: false };
        case 'PAY_RESET':
            return { ...state, loadingPay: false, successPay: false };
        default:
            return state;
    }
}

const OrderScreen = () => {
    const state = useSelector((state) => state.controlItems);
    const { userInfo } = state;

    const params = useParams();
    const { id: orderId } = params
    const navigate = useNavigate();

    const [{ loading, error, order, successPay, loadingPay }, dispatch] = useReducer(reducer, {
        loading: true,
        order: {},
        error: '',
        successPay: false,
        loadingPay: false,
    });
    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

    function createOrder(data, actions) {
        return actions.order.create({
            purchase_units: [
                {
                    amount: { value: order.totalPrice },
                }
            ],
        }).then((orderID) => {
            return orderID;
        });
    }

    function onApprove(data, actions) {
        return actions.order.capture().then(async function (details) {
            try {
                dispatch({ type: 'PAY_REQUEST' });
                const { data } = await axios.put(
                    `/api/orders/${order._id}/pay`,
                    details,
                    {
                        headers: { authorization: userInfo.token }
                    }
                );
                dispatch({ type: 'PAY_SUCCESS', payload: data });
                Toasts('Orden pagada!', 'success');
            } catch (error) {
                console.log(error.stack);
                const error_msg = getError(error);
                dispatch({ type: 'PAY_FAIL', payload: error_msg });
                Toasts(error_msg);
            }
        });
    }
    function onError(error) {
        console.log(error.stack);
        Toasts(getError(error));
    }


    useEffect(() => {
        const fetchOrder = async () => {
            try {
                dispatch({ type: 'FETCH_REQUEST' });
                const { data } = await axios.get(`/api/orders/${orderId}`, {
                    headers: { authorization: userInfo.token },
                });
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            } catch (error) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(error) });
            }
        };
        if (userInfo == null) {
            return navigate('/checkout/signin');
        }
        if (order._id == null || successPay || order._id !== orderId) {
            fetchOrder();
            if (successPay) {
                dispatch({ type: 'PAY_RESET' });
            }
        } else {
            const loadPaypalScript = async () => {
                const { data: clientId } = await axios.get('/api/keys/paypal', {
                    headers: { authorization: userInfo.token }
                });
                paypalDispatch({
                    type: 'resetOptions',
                    value: {
                        'client-id': clientId,
                    }
                });
                paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
            };
            loadPaypalScript();
        }
    }, [order, userInfo, orderId, navigate, paypalDispatch, successPay]);

    const ProductList = (cartItem) => {
        return (
            <div className="px-3 my-2 bg-light rounded-3" key={cartItem.id}>
                <div className="containter py-4">
                    <div className="row justify-content-between">
                        <div className="col-1 py-3">
                            <img src={cartItem.img} alt={cartItem.name} height={65} width={55} />
                        </div>
                        <div className="col-10 justify-content-center">
                            <div className="row justify-content-between">
                                <h5 className='col-3 pt-4'>{cartItem.name}</h5>
                                <div className='col-4 lead py-2' >
                                    {`Cantidad: ${cartItem.qty}`}<br />
                                    {`Precio: ${moneyString(cartItem.price)}\n`}
                                </div>
                                <p className='col-4 lead fw-bold py-3'>{`Total: ${moneyString(cartItem.price * cartItem.qty)}`}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const PaymentMethod = () => {
        switch (order.paymentMethod.toLowerCase()) {
            case 'tranferencias': return <></>;
            case 'webpay': return <></>;
            case 'khipu': return <></>;
            case 'paypal':
                return (
                    <div>
                        <PayPalButtons
                            createOrder={createOrder}
                            onApprove={onApprove}
                            onError={onError}
                        ></PayPalButtons>
                    </div>
                );
            default:
                return (
                    <>
                    </>
                );
        }
    };

    return (
        loading
            ? <LoadingBox />
            : error
                ? <MessageBox variant="danger">{error}</MessageBox>
                :
                <div className='container py-3'>
                    <div className="row g-5 mx-auto">
                        <div className="col-lg-4 py-3 order-md-last mx-auto">
                            <OrderSummary order={order} />
                            <div className='container mt-4'>

                                {!order.isPaid
                                    ? isPending
                                        ? <LoadingBox />
                                        : <PaymentMethod />
                                    : ''}
                                {loadingPay && <LoadingBox />}
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <h1>N° de orden ~{order.orderCode}~</h1>
                            <h5>Orden id {orderId}</h5>
                            <div className="card card-null mb-2" >
                                <div className="card-body" id='shipping-values' >
                                    <h4 className="card-title">Envío</h4>
                                    <div className="card-text mb-3">
                                        <strong className='me-1'>Nombre:</strong>{order.shippingAddress.fullName}<br />
                                        <strong className='me-1'>Teléfono:</strong>{order.shippingAddress.phoneAddress} <br />
                                        <strong className='me-1'>Dirección:</strong>{order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.region} {order.shippingAddress.postalCode != null && order.shippingAddress.postalCode !== '' ? `, ${order.shippingAddress.postalCode}` : ''}
                                    </div>
                                    {order.isDelivered ? (
                                        <MessageBox variant='success' aling='start'>Entregado. Fecha de entrega : {order.deliveredAt}</MessageBox>
                                    ) : (
                                        <MessageBox variant='danger' aling='start'>No entregado</MessageBox>
                                    )}
                                </div>
                            </div>
                            <div className="card card-null " >
                                <div className="card-body" id='shipping-values' >
                                    <h4 className="card-title">Pago</h4>
                                    <div className="card-text  mb-3">
                                        <strong>Método:</strong> {order.paymentMethod.toUpperCase()} <br />
                                        <strong>Documento:</strong> {order.billingAddress.type === 'invoice' ? 'FACTURA' : 'BOLETA'} <br />
                                    </div>
                                    {order.isPaid ? (
                                        <MessageBox variant='success' aling='start'>Pagado. Fecha de pago : {order.paidAt}</MessageBox>
                                    ) : (
                                        <MessageBox variant='danger' aling='start'>No pagado</MessageBox>
                                    )}
                                </div>
                            </div>
                            <div className='py-4'>
                                <h4 className='mb-3'>Productos</h4>
                                {order.orderItems.map(ProductList)}
                            </div>
                        </div>
                    </div>
                </div>

    )
}

export default OrderScreen