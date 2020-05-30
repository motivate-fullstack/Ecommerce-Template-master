import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../../redux/actions';
// import { Toast } from 'bootstrap'
import { randomId } from '../../utils/utils';
import 'react-toastify/dist/ReactToastify.css'
import Toasts from '../secondarys/toasts';


const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/users/signin', {
                email,
                password,
            });
            dispatch(signin(data));
            localStorage.setItem('userInfo', JSON.stringify(data));
            window.location.reload();

        } catch (error) {
            console.log(error.stack);
            Toasts('Usuario o contraseña incorrectos');
        }
    };
    return (
        <>
            {/* <!-- Button trigger modal --> */}
            <button type="button " className={`btn btn-outline-primary ms-auto mx-2 ${props.w != null ? `w-${props.w}` : null}`} data-bs-toggle="modal" data-bs-target="#loginModal" >
                <span className='fa fa-sign-in me-1'></span>Ingresa
            </button>
            {/* <!-- Modal --> */}
            <div className="modal fade" id="loginModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" onSubmit={submitHandler}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id={randomId(7)}>INGRESA TUS DATOS</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <button className="btn btn-primary w-100 mb-4 my-3">
                                <span className='fa fa-google me-2'></span> Ingresa con Google
                            </button>
                            <button className="btn btn-primary w-100 mb-4">
                                <span className='fa fa-facebook me-2'></span> Ingresa con Facebook
                            </button>
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Correo electrónico</label>
                                    <input type="email" className="form-control" id={randomId(7)} aria-describedby="emailHelp" required onChange={(e) => setEmail(e.target.value)} />
                                    <div id={randomId(7)} className="form-text">Nosotros nunca compartiremos tu correo electrónico con nadie.</div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
                                    <input type="password" className="form-control"id={randomId(7)} required onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="mb-3 form-check">
                                    <input type="checkbox" className="form-check-input" id={randomId(7)} />
                                    <label className="form-check-label" htmlFor="exampleCheck1">Recordarme</label>
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

export default Login