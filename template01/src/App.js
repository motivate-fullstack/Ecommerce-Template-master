import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import { Navigate, Route, Routes } from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Products from './components/Products';
import Product from './components/Product';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import AdminPanel from './components/AdminPanel';
import MiniCart from './components/secondarys/MiniCart';
import CheckoutSignin from './components/checkout/CheckoutSignin';
import CheckoutShipping from './components/checkout/CheckoutShipping';
import CheckoutPayment from './components/checkout/CheckoutPayment';
import { ToastContainer } from 'react-toastify';
import CheckoutPlaceorder from './components/checkout/CheckoutPlaceorder';
import OrderSummary from './components/secondarys/OrderSummary';
import OrderScreen from './components/user/OrderScreen';
const myLocal = (text) => {
  return JSON.parse(localStorage.getItem(text));
}
function App() {

  return (
    <>
      <Header />
      <ToastContainer/>
      <Routes>
        <Route exact path='/' element={< Home />} />
        <Route exact path='/products/:id' element={<Product />} />
        <Route exact path='/products' element={<Products />} />
        <Route exact path='/cart' element={<Cart />} />

        <Route exact path='/checkout' element={myLocal('userInfo') == null ? <Navigate to="/checkout/signin" replace={true} /> : <Navigate to="/checkout/shipping" replace={true} />} />
        <Route exact path='/checkout/signin' element={myLocal('userInfo') == null ? <Checkout state={1} cart={<MiniCart />} child={<CheckoutSignin />} /> : <Navigate to="/checkout/shipping" replace={true} />} />
        <Route exact path='/checkout/shipping' element={myLocal('userInfo') == null ? <Navigate to="/checkout/signin" replace={true} /> : <Checkout state={2} cart={<MiniCart />} child={<CheckoutShipping />} />} />
        <Route exact path='/checkout/payment' element={(myLocal('userInfo') == null) ? <Navigate to="/checkout/signin" replace={true} /> : <Checkout state={3} cart={<MiniCart />} child={<CheckoutPayment />} />} />
        <Route exact path='/checkout/placeorder' element={(myLocal('userInfo') == null) ? <Navigate to="/checkout/signin" replace={true} /> : <Checkout state={4} cart={<OrderSummary />} child={<CheckoutPlaceorder />} />} />

        <Route exact path='user/orders/:id' element={<OrderScreen />} />


        <Route exact path='/about' element={<About />} />
        <Route exact path='/contact' element={<Contact />} />
        <Route exact path='/_controlpanel_' element={<AdminPanel />} />
      </Routes>
      <Footer />

    </>
  );
}

export default App;
