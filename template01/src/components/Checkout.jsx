import React from 'react'
import CheckoutBar from './checkout/CheckoutBar.jsx';

const Checkout = (props) => {

    return (
        <>
            <div className="container my-5">
                <div className="row g-5 mx-auto">
                    <div className="col-md-5 col-lg-5 order-md-last mx-auto">
                        {props.cart}
                    </div>
                    <div className="col-md-7 col-lg-7 mx-auto">
                        <div className="row">
                            <><CheckoutBar state={props.state} /></>
                        </div>
                        <div className="container py-3 mx-auto">
                            {props.child}
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Checkout