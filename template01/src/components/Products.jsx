import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
//import DATA from '../Data'
import moneyString from '../utils/Formats';
import { alert, MessageBox } from './secondarys/Messages';
import LoadingBox from './secondarys/LoadingBox';
import { Products_sv } from '../utils/ConectorSV';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../redux/actions';
let DATA;


const HeaderProducts = () => {
  return (
    <>
      <div className="container py-5">
        <div className="row">
          <div className="col-12 text-center">
            <h1>PRODUCTOS</h1>
            <hr />
          </div>
        </div>
      </div>
    </>
  )
};

const Products = () => {
  DATA = Products_sv();
  const dispatch = useDispatch();
  const handleCart = (product) => {
    ;
    dispatch(addItem(product));
    alert('Agregado al carrito!', 'success', product.id);
  };

  const cardItem = (item) => {

    return (
      <div className="card my-5 py-4" key={item.id} style={{ width: '18rem' }}>
        <img src={item.img} className="card-img-top" alt={item.name} />
        <div className="card-body text-center">
          <h5 className="card-title">{item.name}</h5>
          <p className="lead">{moneyString(item.price)}</p>
          <NavLink to={`/products/${item.id}`} className="btn btn-outline-primary px-3 ali me-2">Ver</NavLink>
          {item.stock > 0 ?
            < button onClick={() => handleCart(item)} className="btn btn-outline-primary my-4">Agregar al Carrito</button>
            : < button  className="btn btn-outline-secondary my-4" disabled>Producto agotado</button>}
          <div id={`addedProduct:${item.id}`}></div>
        </div>
      </div >
    );
  };

  return (
    <>
      <div>
        <HeaderProducts />
        <div className="container">
          <div className="row justify-content-around">
            {DATA === true ? <LoadingBox /> : DATA.error === true ? <MessageBox variant="danger">{DATA.message}</MessageBox> : DATA.map(cardItem)}
          </div>
        </div>
      </div>
    </>
    //showProducts(DATA)
  )
}

export default Products