import React from 'react'
import { NavLink } from 'react-router-dom'

const CheckoutBar = (prop) => {
    return (
        <>
            <div className="row checkout-steps" >
                <NavLink className={`col ${prop.state >= 1 ? 'active' : 'inactive'} text-end ${prop.state === 1 ? 'fw-bold' : ''} `} onClick={(e)=>{console.log(e)}}>Ingresa</NavLink>
                <NavLink className={`col ${prop.state >= 2 ? 'active' : 'inactive'} text-end ${prop.state === 2 ? 'fw-bold' : ''} `}to={prop.state >= 2 ? '/checkout/shipping': ''}>Envío</NavLink>
                <NavLink className={`col ${prop.state >= 3 ? 'active' : 'inactive'} text-end ${prop.state === 3 ? 'fw-bold' : ''} `}to={prop.state >= 3 ? '/checkout/payment': ''}>Pago</NavLink>
                <NavLink className={`col ${prop.state >= 4 ? 'active' : 'inactive'} text-end ${prop.state === 4 ? 'fw-bold' : ''} `}to={prop.state >= 4 ? '/checkout/placeorder': ''}>Orden</NavLink>
            </div>
        </>
    )
}

export default CheckoutBar