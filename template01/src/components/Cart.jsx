import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { addItem, restItem, deleteItem } from '../redux/actions/index'
import { useNavigate } from 'react-router-dom'
import moneyString from '../utils/Formats'


const Cart = () => {
    const navigate = useNavigate()

    const state = useSelector((state) => state.controlItems);
    const dispatch = useDispatch();
    const delProduct = (item) => {
        dispatch(deleteItem(item))
    }

    const addProduct = (product) => {
        dispatch(addItem(product));
    }

    const restProduct = (product) => {
        dispatch(restItem(product));
    }

    const cartItem = (cartItem) => {
        return (
            <div className="px-4 my-5 bg-light rounded-3" key={cartItem.id}>
                <div className="containter py-4">
                    <button onClick={() => delProduct(cartItem)} className="btn-close float-end" aria-label='Close'></button>
                    <div className="row justify-content-center">
                        <div className="col-md-3 text-center">
                            <img src={cartItem.img} alt={cartItem.name} height={200} width={180} />
                        </div>
                        <div className="col-md-2 text-center">
                            <h3 className='text-center py-1'>{cartItem.name}</h3>
                            <p className='lead' >{`Precio: ${moneyString(cartItem.price)}\n`}
                                {`Cantidad: ${cartItem.qty}`}
                            </p>
                            <button className="btn btn-light me-4" onClick={() => restProduct(cartItem)}>
                                <i className="fa fa-minus-circle"></i>
                            </button>
                            <button className="btn btn-light" onClick={() => addProduct(cartItem)}>
                                <i className="fa fa-plus-circle"></i>
                            </button>
                            <p className='lead fw-bold py-3'>{`Total: ${moneyString(cartItem.price * cartItem.qty)}`}</p>
                        </div>
                        <div className="col-md-5" align='justify'>
                            <p className='lead'>{cartItem.shortDescription}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const emptyCart = () => {
        return (
            <div className="px-4 my-5 bg-light rounded-3">
                <div className="containter py-4">
                    <div className="row">
                        <h3>Tu Carrito está vacío</h3>
                    </div>
                </div>
            </div>
        );

    }

    const button = () => {
        const goToCheck = () => {
            if (state.cart.cartItems != null && state.cart.cartItems.length > 0) {
                navigate('/checkout');
            }
        }
        return (
            <div className="container">
                <div className="row">
                    <button className="btn btn-outline-primary mb-5 w-25 mx-auto" onClick={goToCheck}>Ir a Pagar</button>
                </div>
            </div>
        );
    };

    return (
        <>
            {state.cart.cartItems.length === 0 && emptyCart()}
            {state.cart.cartItems.length !== 0 && state.cart.cartItems.map(cartItem)}
            {state.cart.cartItems.length !== 0 && button()}
        </>
    )
}

export default Cart