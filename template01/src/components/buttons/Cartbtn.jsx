import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Cartbtn = () => {
    const state = useSelector((state) => state.controlItems);

    let allProducts = 0;
    if (state != null && state.cart != null && state.cart.cartItems != null) {
        state.cart.cartItems.forEach(item => {
            allProducts += item.qty;
        });
    }
    return (
        <>
                <NavLink to='/cart' className='btn btn-outline-primary ms-2 mx-auto'>
                    <span className="fa fa-shopping-cart me-1"> Carrito ({allProducts})</span>
                </NavLink>
        </>
    )
}

export default Cartbtn