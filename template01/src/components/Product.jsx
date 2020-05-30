import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { addItem, restItem } from '../redux/actions/index'
import { Product_sv } from '../utils/ConectorSV';
import moneyString from '../utils/Formats';
import LoadingBox from './secondarys/LoadingBox';
import { MessageBox } from './secondarys/Messages';


const Loading = () => {
  return (
    <>
      <div className="container my-5 py-3">
        <div className="row">
          <div className="container my-5 py-3">
            Loading...
          </div>
        </div>
      </div>
    </>)
};


const Product = () => {
  // const DATA = Products_sv();
  const prod_param = useParams();

  const DATA = Product_sv(prod_param.id);

  const firstSate = { alias: 'addCart', text: 'Agregar al carrito' };
  const [cartBtn, setCartBtn] = useState(firstSate);
  {/* Get product id for product page */ }

  let product;
  if (DATA !== true && DATA.error !== true) {
    // const proDetail = DATA.filter(x => x.id == prod_param.id);
    // product = proDetail[0];
    product = DATA[0];
  }
  const dispatch = useDispatch();
  const handleCart = (product) => {
    if (cartBtn.alias === 'addCart') {
      dispatch(addItem(product));
      setCartBtn({ alias: 'addMore', text: 'Agregar más' });
    } else {
      dispatch(addItem(product));
    }
  };

  const Product_card = () => {
    return (
      <>
        <div className="container my-5 py-3">
          <div className="row">
            < div className="col-md-6 d-flex justify-content-center  mx-auto product" >
              <img src={product.img} alt={product.name} height={400} />
            </div >
            <div className="col-md-6 d-flex flex-column justify-content-center">
              <h1 className='display-5 fw-bold'>{product.name}</h1>
              <hr />
              <h2 className='my-4'>{moneyString(product.price)}</h2>
              <p className='lead'>{product.description}</p>
              {product.stock > 0 ? <button onClick={() => handleCart(product)} className="btn btn-outline-primary my-4">{cartBtn.text}</button>
                :<button onClick={() => handleCart(product)} className="btn btn-outline-secondary my-4" disabled>Producto agotado</button>
              }
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className='container'>
      {DATA === true ?
        <div className="row justify-content-around py-5 my-5"><LoadingBox /></div>
        : DATA.error === true ?
          <div className="row justify-content-around py-5 my-5"> <MessageBox>{DATA.message}</MessageBox> </div>
          : Product_card(DATA)}
    </div>
  );
}

export default Product