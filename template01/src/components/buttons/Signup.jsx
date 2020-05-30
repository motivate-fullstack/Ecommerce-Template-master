import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../../redux/actions';
import { Toast } from 'bootstrap'
import { getError, randomId } from '../../utils/utils';
import Toasts from '../secondarys/toasts';

const Signup = (props) => {

    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();
    const state = useSelector((s) => s.controlItems);


    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            const myToast = document.querySelector('.toast-pass-match-false')
            const bsToast = new Toast(myToast)
            bsToast.show();
            return;
        }
        try {
            const { data } = await axios.post('/api/users/signup', {
                name,
                lastName,
                email,
                password,
            });
            dispatch(signin(data));
            localStorage.setItem('userInfo', JSON.stringify(data));
            window.location.reload();

        } catch (error) {
            console.log(error.stack);
            console.log(getError(error));
            Toasts('Error registrando nuevo usuario.');
        }
    };
    return (
        <div>
            {/* <!-- Button trigger modal --> */}
            <button type="button " className={`btn btn-outline-primary ms-auto ${props.w != null ? `w-${props.w}` : null}`} data-bs-toggle="modal" data-bs-target="#signupModal" >
                <span className='fa fa-user-plus me-1'></span>Regístrate
            </button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id='signupModal' tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" onSubmit={submitHandler}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id={randomId(7)}>INGRESA TUS DATOS</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <button className="btn btn-primary w-100 mb-4 my-3">
                                <span className='fa fa-google me-2'></span>Regístrate con Google
                            </button>
                            <button className="btn btn-primary w-100 mb-4">
                                <span className='fa fa-facebook me-2'></span>Regístrate con Facebook
                            </button>
                            <form>
                                <div className="mb-2">
                                    <label htmlFor="exampleInput1" className="form-label">Nombre</label>
                                    <input type="text" className="form-control" id={randomId(7)} required onChange={(e) => setName(e.target.value)} />
                                    <label htmlFor="exampleInput2" className="form-label">Apellidos</label>
                                    <input type="text" className="form-control" id={randomId(7)} required onChange={(e) => setLastName(e.target.value)} />
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Correo electrónico</label>
                                    <input type="email" className="form-control" id={randomId(7)} aria-describedby="emailHelp" required onChange={(e) => setEmail(e.target.value)} />
                                    <div id="emailHelp" className="form-text">Nosotros nunca compartiremos tus datos con nadie.</div>
                                </div>
                                <div className="mb-1">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
                                    <input type="password" className="form-control" id={randomId(7)} required onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword2" className="form-label">Repita contraseña</label>
                                    <input type="password" className="form-control" id={randomId(7)} required onChange={(e) => setConfirmPassword(e.target.value)} />
                                </div>
                                <div className="mb-2 form-check">
                                    <input type="checkbox" className="form-check-input" id={randomId(7)} />
                                    <label className="form-check-label" htmlFor="exampleCheck1">Acepto los términos y condiciones</label>
                                </div>
                                <button type="submit" className="btn btn-outline-primary w-100 mt-4">ACEPTAR</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup