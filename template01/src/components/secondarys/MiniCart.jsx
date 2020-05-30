import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addItem, deleteItem, restItem } from '../../redux/actions';
import moneyString from '../../utils/Formats';

const MiniCart = () => {
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



    var total = 0;
    const itemList = (item) => {
        total = total + (item.price * item.qty);
        return (
            <li className="list-group-item d-flex justify-content-between lh-sm align-items-center " key={item._id}>
                <div className="bg-light px-1 py-1">
                    <img src={item.img} alt={item.shorName} height={30} width={25} />
                </div>
                <div className=' fw-bold px-2 mx-1' style={{ flex: 1, justifyContent: 'center', alignItems: "center" }}>{item.name}</div>
                <div className='col-4 text-center'>
                    <button className="btn  btn-sm" onClick={() => restProduct(item)}>
                        <i className="fa fa-minus"></i>
                    </button>
                    <span className="text-muted mx-2">{item.qty}</span>

                    <button className="btn btn-sm" onClick={() => addProduct(item)}>
                        <i className="fa fa-plus"></i>
                    </button>
                    {/* <button className="btn fa fa-minus btn-sm" ></button>
                    <button className="btn fa fa-plus btn-sm" ></button> */}
                </div>
                <div className="col-3 text-end">
                    <span className="text-muted">{moneyString(item.price * item.qty)}</span>
                </div>
            </li>
        );
    };
    let allProducts = 0;
    if (state != null && state.cart != null && state.cart.cartItems != null) {
        state.cart.cartItems.forEach(item => {
            allProducts += item.qty;
        });
    }
    return (
        <div className='px-3 mx-auto'>
            <h4 className="d-flex justify-content-between align-items-center mb-3" id='checkOut_render'>
                <span className="text-primary">Tu carrito</span>
                <span className="badge bg-primary rounded-pill">{allProducts}</span>
            </h4>
            <ul className="list-group mb-3">
                {state.cart.cartItems.map(itemList)}

                <li className="list-group-item d-flex justify-content-between">
                    <span>Total (CLP)</span>
                    <strong>{moneyString(total)}</strong>
                </li>
            </ul>

            <form className="card p-2">
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Promo code" />
                    <button type="submit" className="btn btn-secondary">canjear</button>
                </div>
            </form>
        </div>
    )
}

export default MiniCart