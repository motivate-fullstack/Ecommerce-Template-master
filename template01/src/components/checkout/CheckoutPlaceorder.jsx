import React from 'react'
import MiniCart from '../secondarys/MiniCart';
import { useSelector } from 'react-redux';



const CheckoutPlaceorder = () => {


    const state = useSelector((state) => state.controlItems);
    const {
        cart, 
    } = state;

    const SendData = () => {
        return (
            <>
                <div className="col md-8">
                    <div className=" ">
                        <h5 className=" ">Envío </h5>
                        <p className=''>
                            <strong className='mx-2'>Nombre:</strong>{cart.shippingAddress.fullName} <br />
                            <strong className='mx-2'>Rut:</strong>{cart.shippingAddress.rut}
                            <strong className='ms-4 mx-2'>Tel.:</strong>{cart.shippingAddress.addressPhone} <br />
                            <strong className='mx-2'>Nombre:</strong>{cart.shippingAddress.fullName} <br />
                        </p>
                    </div>
                </div>
            </>
        );
    };

    const BillingData = () => {
        return (
            <>
                <p className=''>
                    <strong className='mx-2'>Tipo:</strong>{'Factura'} <br />
                    <strong className='mx-2'>Nombre:</strong>{cart.billingAddress.name} <br />
                    <strong className='mx-2'>Rut:</strong>{cart.billingAddress.rut}
                    <strong className='ms-4 mx-2'>Giro:</strong>{cart.billingAddress.giro} <br />
                    <strong className='mx-2'>Dirección:</strong>{cart.billingAddress.address}, {cart.billingAddress.city}, {cart.billingAddress.region}, {cart.billingAddress.postal}<br />
                </p>

            </>
        );
    };
    const PaymentData = () => {
        return (
            <>
                <div className="row">
                    <div className="col-5 my-1">
                        <h5 className="mt-3">Método de Pago </h5>
                        <p className='mb-4'>
                            <strong className='mx-2'>{cart.paymentMethod}</strong>
                        </p>
                    </div>
                </div>
            </>
        );
    }
    return (
        <div className='col-9 mx-auto'>
            <h1 className='mb-3 text-center'>Revisa tu orden</h1>
            <div className="row">
                <PaymentData />
            </div>
            <div className="row">
                <SendData />
            </div>
            <div className="row">
                <div className="col md-8">
                    <div className="">
                        <div className=" ">
                            <h5 className=" ">Facturación </h5>
                            {cart.billingAddress.type === 'invoice' ? <BillingData /> : <p className='card-text'><strong className='mx-2'>Boleta</strong></p>}
                        </div>
                    </div>
                </div>
            </div>
            <div className="row py-3">
                <MiniCart />
            </div>
        </div>
    )
}

export default CheckoutPlaceorder