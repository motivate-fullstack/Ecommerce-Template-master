import React from 'react'
import Login from '../buttons/Login'
import Signup from '../buttons/Signup'
import { useSelector } from 'react-redux';


const CheckoutSignin = () => {
  const enterVisit = () => {
    localStorage.setItem('userInfo', JSON.stringify({ visit: true }));
    window.location.reload();
  };
  return (
    <div className='col-md-7 col-lg-9 mx-auto'>
      <ul className="list-group mb-3 text-center bg-primary">
        <h1 className="h3 mb-3 fw-bold text-center align-middle my-2 text-light ">INGRESA TU USUARIO</h1>
        <li className="list-group-item d-block bg-light">
          <div className="form-floating py-1 ">
            <Login w={100} />
          </div>
        </li>
        <li className="list-group-item d-block bg-light">
          <div className="form-floating py-1">
            <Signup w={100} />
          </div>
        </li>
        <li className="list-group-item d-block bg-light">
          <div className="form-floating py-1">
            <button className=" btn btn-outline-secondary" type="submit" onClick={enterVisit}>Continua como visitante</button>
          </div>
        </li>
      </ul>
    </div>
  )
}
export default CheckoutSignin;