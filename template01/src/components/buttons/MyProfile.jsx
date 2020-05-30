import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { signout } from '../../redux/actions';


const submitHandler = () => {

};

const MyProfile = () => {
    const state = useSelector((s) => s.controlItems);
    const dispatch = useDispatch();
    const Logout = () => {
        if (state.userInfo != null) {
            dispatch(signout());
            localStorage.removeItem('userInfo');
            localStorage.removeItem('shippingAddress');
            localStorage.removeItem('billingAddress');
            localStorage.removeItem('cartItems');
            localStorage.removeItem('paymentMethod');
            window.location.reload();
        }
    };
    return (
        <>
            <div className="dropdown mx-auto">
                <button className="btn btn-outline-primary ms-auto dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <span className='fa fa-user me-1'></span>Mi perfil
                </button>
                <ul className="dropdown-menu">
                    <li><NavLink className="dropdown-item" to="/profile">Mi perfil</NavLink></li>
                    <li><button className="dropdown-item" data-bs-toggle="modal" data-bs-target="#loginModal" to="/">Cambiar contraseña</button></li>
                    <li><button className="dropdown-item" onClick={Logout} >Cerrar sesión</button></li>
                </ul>
            </div>

            {/* <!-- Modal Cambiar Contraseña--> */}
            <div className="modal fade" id="changePW" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" onSubmit={submitHandler}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">CAMBIA TU CONTRASEÑA</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Contraseña actual</label>
                                    <input type="password" className="form-control" id="last_passwordUser" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Nueva Contraseña</label>
                                    <input type="password" className="form-control" id="new_passwordUser" required />
                                </div>
                                <button type="submit" className="btn btn-outline-primary w-100 mt-4">ACEPTAR</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default MyProfile