import React from 'react'
import { NavLink } from 'react-router-dom'
import Cartbtn from './buttons/Cartbtn'
import Login from './buttons/Login'
import Signup from './buttons/Signup'
import MyProfile from './buttons/MyProfile'

const Header = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <NavLink className="navbar-brand mx-auto fw-bold px-3" to="/">APPLE MART</NavLink>
                <div className="col-lg-4 navbar container-fluid order-md-last mx-auto" id="navbar">
                    {JSON.parse(localStorage.getItem('userInfo')) != null && JSON.parse(localStorage.getItem('userInfo')).visit !== true
                    ? <MyProfile />
                    : (<><Login /> <Signup /></>)}
                    <Cartbtn />
                </div>
                <div className="col-lg-6 container-fluid py-2 px-3">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/products">Productos</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/about">Sobre Nosotros</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/contact">Contacto</NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    </div>

                </div>
            </nav>
        </div>
    )
}

export default Header