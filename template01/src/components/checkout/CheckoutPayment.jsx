import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveBillingAddress, savePaymentMethod } from '../../redux/actions';
import Form from 'react-bootstrap/Form';
import Collapse from 'react-bootstrap/Collapse';
import Toasts from '../secondarys/toasts';

const defaultGiro = 'Persona Natural';

const CheckoutPayment = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const state = useSelector((state) => state.controlItems);
    console.log(state);


    const {
        cart: { shippingAddress, paymentMethod, billingAddress },
    } = state;
    const cart = state.cart;
    const allData = ((shippingAddress.fullName != null && shippingAddress.fullName !== '') && (shippingAddress.rut != null && shippingAddress.rut !== '') && (shippingAddress.addressPhone != null && shippingAddress.addressPhone !== '') && (shippingAddress.address != null && shippingAddress.address !== '') && (shippingAddress.address2 != null && shippingAddress.address2 !== '') && (shippingAddress.city != null && shippingAddress.city !== '') && (shippingAddress.region != null && shippingAddress.region !== '') && (shippingAddress.postalCode != null && shippingAddress.postalCode !== '') && (shippingAddress.additional != null && shippingAddress.additional !== ''))

    let [typeBilling, setTypeBilling] = useState(billingAddress && billingAddress.type ? billingAddress.type : 'bill');
    let [nameBilling, setNameBilling] = useState(billingAddress && billingAddress.type ? billingAddress.nameBilling : shippingAddress.fullName);
    let [rutBilling, setRutBilling] = useState(billingAddress && billingAddress.type ? billingAddress.rutBilling : shippingAddress.rut);
    let [giroBilling, setGiroBilling] = useState(billingAddress && billingAddress.type ? billingAddress.giroBilling : defaultGiro);
    let [addressBilling, setAddressBilling] = useState(billingAddress && billingAddress.type ? billingAddress.addressBilling : shippingAddress.address);
    let [address2Billing, setAddress2Billing] = useState(billingAddress && billingAddress.type ? billingAddress.address2Billing : shippingAddress.address2);
    let [cityBilling, setCityBilling] = useState(billingAddress && billingAddress.type ? billingAddress.cityBilling : shippingAddress.city);
    let [regionBilling, setRegionBilling] = useState(billingAddress && billingAddress.type ? billingAddress.regionBilling : shippingAddress.region);
    let [postalBilling, setPostalBilling] = useState(billingAddress && billingAddress.type ? billingAddress.postalBilling : shippingAddress.postalCode);
    let [paymentMethodName, setPaymentMethod] = useState(paymentMethod || 'transferencia');


    useEffect(() => {
        if (!allData) {
            navigate('/checkout/shipping');
        }
    }, [allData, navigate]);

    const submitHandler = (e) => {
        e.preventDefault()
        if ((typeBilling != null && typeBilling !== '') && (nameBilling != null && nameBilling !== '') && (rutBilling != null && rutBilling !== '') && (giroBilling != null && giroBilling !== '') && (addressBilling != null && addressBilling !== '') && (address2Billing != null && address2Billing !== '') && (cityBilling != null && cityBilling !== '') && (regionBilling != null && regionBilling !== '') && (postalBilling != null && postalBilling !== '') && (paymentMethodName != null && paymentMethodName !== '')) {
            const billingData = {
                type: typeBilling,
                name: nameBilling,
                rut: rutBilling,
                giro: giroBilling,
                address: `${addressBilling} ${address2Billing}`,
                city: cityBilling,
                region: regionBilling,
                postal: postalBilling,
            };
            
            //SET PAYMENT
            dispatch(savePaymentMethod(paymentMethodName));
            localStorage.setItem('paymentMethod', JSON.stringify(paymentMethodName));

            //SET BILLING ADDRESS
            dispatch(saveBillingAddress(billingData));
            localStorage.setItem('billingAddress', JSON.stringify(billingData));



            navigate('/checkout/placeorder');
        } else if (paymentMethodName == null || paymentMethodName === '') {
            Toasts('Por favor elige un método de pago');
        } else {
            Toasts('Por favor rellena todos los datos de facturación');
        }
    };
    const setDefault = (type) => {
        console.log('default');
        // setNameBilling = (text) => { nameBilling = text; }
        // setRutBilling = (text) => { rutBilling = text; }
        // setGiroBilling = (text) => { giroBilling = text; }
        // setAddressBilling = (text) => { addressBilling = text; }
        // setAddress2Billing = (text) => { address2Billing = text; }
        // setCityBilling = (text) => { cityBilling = text; }
        // setRegionBilling = (text) => { regionBilling = text; }
        // setPostalBilling = (text) => { postalBilling = text; }

        setTypeBilling(type);
        setNameBilling(shippingAddress.fullName);
        setRutBilling(shippingAddress.rut);
        setGiroBilling(defaultGiro);
        setAddressBilling(shippingAddress.address);
        setAddress2Billing(shippingAddress.address2);
        setCityBilling(shippingAddress.city);
        setRegionBilling(shippingAddress.region);
        setPostalBilling(shippingAddress.postalCode);
    };
    const BillingAddressForm = () => {
        return (
            <div className='container mt-3'>
                <div className='py-1 text-center'>
                    <h5>Información de facturación</h5>
                </div>
                <div className='py-2'>
                    <form className="row g-3">
                        <div className="col-md-12">
                            <label htmlFor="inputEmail4" className="form-label">Razón social</label>
                            <input type="text" className="form-control" id="inputNameVisit" required onChange={(e) => setNameBilling(e.target.value)} />
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="inputPassword4" className="form-label">Rut</label>
                            <input type="text" className="form-control" id="inputLastNameVisit" required onChange={(e) => setRutBilling(e.target.value)} />
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="inputEmail4" className="form-label">Giro</label>
                            <input type="text" className="form-control" id="inputRutVisit" required onChange={(e) => setGiroBilling(e.target.value)} />
                        </div>
                        <div className="col-12">
                            <label htmlFor="inputAddress" className="form-label">Dirección</label>
                            <input type="text" className="form-control" id="inputAddressVisit" placeholder="Av. Central 622" required onChange={(e) => setAddressBilling(e.target.value)} />
                        </div>
                        <div className="col-12">
                            <label htmlFor="inputAddress2" className="form-label">Dirección 2</label>
                            <input type="text" className="form-control" id="inputAddress2Visit" placeholder="Departamento, oficina, piso." required onChange={(e) => setAddress2Billing(e.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputCity" className="form-label">Ciudad</label>
                            <input type="text" className="form-control" id="inputCityVisit" required onChange={(e) => setCityBilling(e.target.value)} />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="inputState" className="form-label">Región</label>
                            <select id="inputStateVisit" className="form-select" defaultValue=' ' required onChange={(e) => setRegionBilling(e.target.value)}>
                                <option> </option>
                                <option>Antofagasta</option>
                                <option>Arica y Parinacota</option>
                                <option>Atacama</option>
                                <option>Aysén</option>
                                <option>Biobío</option>
                                <option>Coquimbo</option>
                                <option>La Araucanía</option>
                                <option>Los Lagos</option>
                                <option>Los Ríos</option>
                                <option>Magallanes</option>
                                <option>Maule</option>
                                <option>Metropolitana</option>
                                <option>Ñuble</option>
                                <option>O'Higgins</option>
                                <option>Tarapacá</option>
                                <option>Valparaíso</option>
                            </select>
                        </div>
                        <div className="col-md-2">
                            <label htmlFor="inputZip" className="form-label">N° Postal</label>
                            <input type="text" className="form-control" id="inputPostalVisit" onChange={(e) => setPostalBilling(e.target.value)} />
                        </div>
                    </form>
                </div>
            </div>
        );
    };

    const UserComplete = () => {
        return (
            <div className="container border">
                <div className='col-md-7 col-lg-11 mx-auto' >
                    <h4 className='text-center mt-3 mb-2'>
                        Datos de envío
                    </h4>
                    <ul className="list-group mb-3">

                        <li className="list-group-item d-flex justify-content-between bg-light " >
                            <span className='me-2'>Nombre:</span>{shippingAddress.fullName}
                        </li>
                        <li className="list-group-item d-flex justify-content-between bg-light  " >
                            <span className='me-2'>Rut: </span> {shippingAddress.rut}
                        </li>
                        <li className="list-group-item d-flex justify-content-between bg-light  " >
                            <span className='me-2'>Teléfono: </span> {shippingAddress.addressPhone}
                        </li>
                        <li className="list-group-item d-flex justify-content-between bg-light " >
                            <span className='me-2'>Dirección: </span> {shippingAddress.address}, {shippingAddress.address2}, {shippingAddress.city}, {shippingAddress.region}
                        </li>
                        {shippingAddress.additional != null && shippingAddress.additional !== '' ? <li className="list-group-item d-flex justify-content-between bg-light " >
                            <span className='me-2'>Información: </span> {shippingAddress.additional}
                        </li> : <></>}
                    </ul>


                </div>
            </div>
        );
    };

    const PayMethod = () => {
        const [open, setOpen] = useState(billingAddress.same != null && !billingAddress.same);
        const [invoice, setInvoice] = useState(billingAddress && billingAddress.type === 'invoice' ? true : false);

        setTypeBilling = (text) => { typeBilling = text; }
        setNameBilling = (text) => { nameBilling = text; }
        setRutBilling = (text) => { rutBilling = text; }
        setGiroBilling = (text) => { giroBilling = text; }
        setAddressBilling = (text) => { addressBilling = text; }
        setAddress2Billing = (text) => { address2Billing = text; }
        setCityBilling = (text) => { cityBilling = text; }
        setRegionBilling = (text) => { regionBilling = text; }
        setPostalBilling = (text) => { postalBilling = text; }
        setPaymentMethod = (text) => { paymentMethodName = text};

        const [transf, setTransf] = useState(false);
        const [webPay, setWebPay] = useState(false);
        const [khipo, setKhipu] = useState(false);
        const [payPal, setPaypal] = useState(false);

        const selectPayMethod = (value)=>{
            setTransf(value==='transferencia');
            setWebPay(value==='webpay');
            setKhipu(value==='khipu');
            setPaypal(value==='paypal');

            setPaymentMethod(value);
        };

        const changeState = (e) => {
            if (e.target.id.includes('invoice')) {
                setInvoice(true);
                setTypeBilling('invoice')
            } else {
                setInvoice(false);
                setTypeBilling('bill')
                setDefault('bill');
                setNameBilling(`${shippingAddress.fullName}`);
            }
        }
        const checkInvoice = (value) => {
            setOpen(value);
            if (!value) {
                setDefault('invoice');
            } else {
                setNameBilling(null);
                setRutBilling(null);
                setGiroBilling(null);
                setAddressBilling(null);
                setAddress2Billing(null);
                setCityBilling(null);
                setRegionBilling(null);
                setPostalBilling(null);
            }
        };
        // setPaymentMethod = (text) => { paymentMethod = text }
        return (
            <div className='container border'>
                <h4 className='text-center py-3 my-1'>
                    Datos Facturación
                </h4>
                <div className="container">
                    {['radio'].map((type) => (
                        <div key={`inline-${type}`} className="mb-3">
                            <Form.Check
                                inline
                                type={type}
                                id={`bill-${type}`}
                                label={`Boleta`}
                                name='billOrInvoice'
                                onChange={(e) => { changeState(e) }}
                                defaultChecked={typeBilling === 'bill'}
                            />
                            <Form.Check
                                inline
                                type={type}
                                id={`invoice-${type}`}
                                label={`Factura`}
                                name='billOrInvoice'
                                onChange={(e) => { changeState(e) }}
                                defaultChecked={typeBilling === 'invoice'}
                            />
                        </div>
                    ))}

                    <Collapse in={invoice}>
                        <div id="example-collapse-text">
                            <Form.Check
                                id="CheckSameAddress"
                                label="Misma dirección de envío"
                                onChange={() => checkInvoice(!open)}
                                aria-controls="invoice-form-collapse"
                                aria-expanded={open}
                                defaultChecked
                            />
                            <Collapse in={open}>
                                <div id="invoice-form-collapse">
                                    <BillingAddressForm />
                                </div>
                            </Collapse>
                        </div>
                    </Collapse>
                </div>


                <form action="" onSubmit={submitHandler} className='my-4'>
                    <div className="row justify-content-around mx-auto">
                        <div className='col-lg-4 py-2'>
                            <h5 className='text-center'>
                                Método de pago
                            </h5>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onChange={() => { selectPayMethod('transferencia') } } checked={paymentMethodName === 'transferencia'} />
                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                    Transferencia
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onChange={() => { selectPayMethod('webpay') }} checked={paymentMethodName === 'webpay'} />
                                <label className="form-check-label" htmlFor="flexRadioDefault2">
                                    WebPay
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" onChange={() => { selectPayMethod('khipu') }} checked={paymentMethodName === 'khipu'} />
                                <label className="form-check-label" htmlFor="flexRadioDefault3">
                                    Khipu
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault4" onChange={() => { selectPayMethod('paypal') }} checked={paymentMethodName === 'paypal'} />
                                <label className="form-check-label" htmlFor="flexRadioDefault4">
                                    Paypal
                                </label>
                            </div>

                        </div>
                        <div className="col-lg-5 d-grid gap-2 py-2">
                            <button className='btn btn-outline-primary btn-lg fw-bold' type='submit' style={{ fontSize: '25px' }}>PROCESAR ORDEN</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div>
            <UserComplete />
            <PayMethod />
        </div>
    )
}

export default CheckoutPayment