import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { saveShippingAddress, signin } from '../../redux/actions';
import { getError } from '../../utils/utils';
import Toasts from '../secondarys/toasts';
import { useNavigate } from 'react-router-dom';

const CheckoutShipping = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const state = useSelector((state) => state.controlItems);
    const user = state.userInfo;
    const allData = (user.visit !== true && (user.name != null && user.name !== '') && (user.lastName != null && user.lastName !== '') && (user.rut != null && user.rut !== '') && (user.phone != null && user.phone !== '') && (user.email != null && user.email !== ''))

    let [name, setName] = useState('');
    let [lastName, setLastName] = useState('');
    let [rut, setRut] = useState('');
    let [phone, setPhone] = useState('');
    let [email, setEmail] = useState('');
    let [alias, setAlias] = useState('');
    let [newAlias, setNewAlias] = useState('');
    let [address, setAddress] = useState('');
    let [address2, setAddress2] = useState('');
    let [addressPhone, setAddressPhone] = useState('');
    let [city, setCity] = useState('');
    let [region, setRegion] = useState('');
    let [postalCode, setPostalCode] = useState('');
    let [additional, setAdditional] = useState('');

    const saveAddress = async (e) => {
        e.preventDefault()
        try {
            console.log();
            if ((newAlias != null && newAlias !== '') && (address != null && address !== '') && (address2 != null && address2 !== '') && (city != null && city !== '') && (region != null && region !== '')) {
                const { data } = await axios.post('/api/users/newshipping', {
                    user,
                    newAlias,
                    addressPhone,
                    region,
                    city,
                    address,
                    address2,
                    postalCode,
                    additional,
                });
                dispatch(signin(data));
                localStorage.setItem('userInfo', JSON.stringify(data));
                window.location.reload();
            } else {
                Toasts('Rellene todos los datos');
            }
        } catch (error) {
            console.log(error.stack);
            console.log(getError(error));
            Toasts('Error agregando nueva dirección...');
        }
    };

    const proccessPay = async (e) => {
        e.preventDefault();
        try {
            if ((name != null && name !== '') && (lastName != null && lastName !== '') && (rut != null && rut !== '') && (phone != null && phone !== '') && (email != null && email !== '') && (address != null && address !== '') && (address2 != null && address2 !== '') && (addressPhone != null && addressPhone !== '') && (city != null && city !== '') && (region != null && region !== '') && (postalCode != null && postalCode !== '') && (additional != null && additional !== '')) {
                let userData = state.userInfo;
                const addressData = {
                    fullName: `${name} ${lastName}`,
                    rut: rut,
                    addressPhone: addressPhone,
                    address: address,
                    address2: address2,
                    city: city,
                    region: region,
                    postalCode: postalCode,
                    additional: additional,
                };
                if (!allData) {
                    const { data } = await axios.post('/api/users/edit-user', {
                        user,
                        name,
                        lastName,
                        rut,
                        phone,
                    });
                    userData = data;
                }

                dispatch(signin(userData));
                localStorage.setItem('userInfo', JSON.stringify(userData));

                dispatch(saveShippingAddress(addressData));
                localStorage.setItem('shippingAddress', JSON.stringify(addressData));

                navigate("/checkout/payment");
            } else {
                console.log(`name => ${name}`)
                console.log(`lastName => ${lastName}`)
                console.log(`rut => ${rut}`)
                console.log(`phone => ${phone}`)
                console.log(`email => ${email}`)
                console.log(`alias => ${alias}`)
                console.log(`address => ${address}`)
                console.log(`address2 => ${address2}`)
                console.log(`addressPhone => ${addressPhone}`)
                console.log(`city => ${city}`)
                console.log(`region => ${region}`)
                console.log(`postalCode => ${postalCode}`)
                console.log(`additional => ${additional}`)

                Toasts('Complete toda la información de envío');
            }
        } catch (error) {
            console.log(error.stack);
            Toasts('Error actualizando la información de usuario en el servidor...');
        }
    }

    const ShippingVisitForm = () => {
        setName = (text) => { name = text }
        setLastName = (text) => { lastName = text }
        setRut = (text) => { rut = text }
        setPhone = (text) => { phone = text; addressPhone = text }
        setEmail = (text) => { email = text }
        setAddress = (text) => { address = text }
        setAddress2 = (text) => { address2 = text }
        setCity = (text) => { city = text }
        setRegion = (text) => { region = text }
        setPostalCode = (text) => { postalCode = text }
        setAdditional = (text) => { additional = text }

        return (
            <>
                <div className='py-1 text-center'>
                    <h4>Información de envío</h4>
                </div>
                <div className='py-2'>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label htmlFor="inputEmail4" className="form-label">Nombre</label>
                            <input type="text" className="form-control" id="inputNameVisit" required onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputPassword4" className="form-label">Apellidos</label>
                            <input type="text" className="form-control" id="inputLastNameVisit" required onChange={(e) => setLastName(e.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputEmail4" className="form-label">Rut</label>
                            <input type="text" className="form-control" id="inputRutVisit" required onChange={(e) => setRut(e.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputPassword4" className="form-label">Teléfono</label>
                            <input type="text" className="form-control" id="inputPhoneVisit" required onChange={(e) => setPhone(e.target.value)} />
                        </div>
                        <div className="col-12">
                            <label htmlFor="inputAddress" className="form-label">E-mail</label>
                            <input type="email" className="form-control" id="inputEmailVisit" required onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="col-12">
                            <label htmlFor="inputAddress" className="form-label">Dirección</label>
                            <input type="text" className="form-control" id="inputAddressVisit" placeholder="Av. Central 622" required onChange={(e) => setAddress(e.target.value)} />
                        </div>
                        <div className="col-12">
                            <label htmlFor="inputAddress2" className="form-label">Dirección 2</label>
                            <input type="text" className="form-control" id="inputAddress2Visit" placeholder="Departamento, oficina, piso." required onChange={(e) => setAddress2(e.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputCity" className="form-label">Ciudad</label>
                            <input type="text" className="form-control" id="inputCityVisit" required onChange={(e) => setCity(e.target.value)} />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="inputState" className="form-label">Región</label>
                            <select id="inputStateVisit" className="form-select" defaultValue=' ' required onChange={(e) => setRegion(e.target.value)}>
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
                            <input type="text" className="form-control" id="inputPostalVisit" onChange={(e) => setPostalCode(e.target.value)} />
                        </div>
                        <div className="col-12">
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlTextarea1" className="form-label">Comentarios de envío</label>
                                <textarea className="form-control" id="inputAdditionalVisit" onChange={(e) => setAdditional(e.target.value)} rows="3"></textarea>
                            </div>
                        </div>
                    </form>
                </div>
            </>
        );
    }

    const AddAdrressForm = () => {

        setAddress = (text) => { address = text }
        setAddress2 = (text) => { address2 = text }
        setAddressPhone = (text) => { addressPhone = text }
        setCity = (text) => { city = text }
        setRegion = (text) => { region = text }
        setPostalCode = (text) => { postalCode = text }
        setAdditional = (text) => { additional = text }

        setAlias = () => { newAlias = 'PRINCIPAL' };
        setAlias();

        const selectPhone = () => {
            const mySwitch = document.getElementById('switch-same-phone');
            const myInput = document.getElementById('input-addres-phone-addresForm');
            if (mySwitch.checked) {
                myInput.disabled = true;
                myInput.value = phone;
                setAddressPhone(phone);
            } else {
                myInput.disabled = false;
                myInput.value = '';
            }
        };
        return (
            <>
                <div className='py-2 text-center'>
                    <h4>Ingrese Información</h4>
                </div>
                <div className='submit' type='submit'>
                    <form className="row g-3" onSubmit={(e) => { saveAddress(e) }} >
                        <div className="col-7">
                            <label htmlFor="inputAddress" className="form-label">Dirección</label>
                            <input type="text" className="form-control" id="inputAddresUser" placeholder="Av. Central 622" required onChange={(e) => setAddress(e.target.value)} />
                        </div>
                        <div className="col-5 position-relative">
                            <label htmlFor="inputAddress" className="form-label">Teléfono</label>
                            <div className="div position-absolute top-0 end-0 form-check form-switch">
                                <input className="form-check-input" type="checkbox" role="switch" id="switch-same-phone" defaultChecked={phone != null && phone !== '' ? true : false} onChange={selectPhone} />
                                <label className="form-check-label" htmlFor="defaultCheck1">
                                    Usar personal?
                                </label>
                            </div>
                            <input type="text" className="form-control" id="input-addres-phone-addresForm" required onChange={(e) => setAddressPhone(e.target.value)} disabled={phone != null && phone !== '' ? true : false} defaultValue={phone != null && phone !== '' ? phone : ''} />
                        </div>
                        <div className="col-12">
                            <label htmlFor="inputAddress2" className="form-label">Dirección 2</label>
                            <input type="text" className="form-control" id="inputAddrdress2User" placeholder="Departamento, oficina, piso." required onChange={(e) => setAddress2(e.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputCity" className="form-label">Ciudad</label>
                            <input type="text" className="form-control" id="inputCityUser" required onChange={(e) => setCity(e.target.value)} />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="inputState" className="form-label">Región</label>
                            <select id="inputStateUser" className="form-select" defaultValue=' ' required onChange={(e) => setRegion(e.target.value)}>
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
                            <input type="text" className="form-control" id="inputPostalUser" onChange={(e) => setPostalCode(e.target.value)} />
                        </div>
                        <div className="col-12">
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlTextarea1" className="form-label">Comentarios de envío</label>
                                <textarea className="form-control" id="inputAditionalUser" rows="3" onChange={(e) => setAdditional(e.target.value)}></textarea>
                            </div>
                        </div>
                        <div className="container">
                            <button type="submit" className="btn btn-outline-primary w-100 " >AGREGAR DIRECCIÓN</button>
                        </div>
                    </form>
                </div>
            </>
        );
    };


    const UserComplete = () => {

        setName = () => { name = user.name; }
        setLastName = () => { lastName = user.lastName }
        setRut = () => { rut = user.rut }
        setPhone = () => { phone = user.phone; }
        setAddressPhone = () => { addressPhone = user.phone; }
        setEmail = () => { email = user.email }

        return (
            <>
                <div className="container">

                    <div className='col-md-7 col-lg-9 mx-auto'>
                        <ul className="list-group mb-3">
                            <h3 className='text-center'>
                                Datos personales
                            </h3>

                            <li className="list-group-item d-flex justify-content-between bg-light" onChange={setName()}>
                                <span onChange={setLastName()}>Nombre:</span>{user.name} {user.lastName}
                            </li>
                            <li className="list-group-item d-flex justify-content-between bg-light " onChange={setRut()}>
                                <span onChange={setEmail()}>Rut </span> {user.rut}
                            </li>
                            <li className="list-group-item d-flex justify-content-between bg-light " onChange={setPhone()}>
                                <span onChange={setAddressPhone()}>Teléfono </span> {user.phone}
                            </li>
                        </ul>
                    </div>
                </div>
            </>
        );
    };
    const UserForm = (props) => {
        const user = props.user;

        setName = (text) => { name = text }
        setLastName = (text) => { lastName = text }
        setRut = (text) => { rut = text }
        setPhone = (text) => { phone = text }
        setEmail = (text) => { email = text }

        return (
            <>
                <div className='py-1 text-center'>
                    <h4>Información personal</h4>
                </div>
                <div className='py-2'>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label htmlFor="inputEmail4" className="form-label">Nombre</label>
                            <input type="text" className="form-control" id="inputNameUserin" required onChange={user.name != null && user.name !== '' ? setName(user.name) : (e) => setName(e.target.value)} defaultValue={user.name != null ? user.name : ''} disabled={user.name != null && user.name !== ''} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputPassword4" className="form-label">Apellidos</label>
                            <input type="text" className="form-control" id="inputLastnameUserin" required onChange={user.lastName != null && user.lastName !== '' ? setLastName(user.lastName) : (e) => setLastName(e.target.value)} defaultValue={user.lastName != null ? user.lastName : ''} disabled={user.lastName != null && user.lastName !== ''} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputEmail4" className="form-label">Rut</label>
                            <input type="text" className="form-control" id="inputRutUserin" required onChange={user.rut != null && user.rut !== '' ? setRut(user.rut) : (e) => setRut(e.target.value)} defaultValue={user.rut != null ? user.rut : ''} disabled={user.rut != null && user.rut !== ''} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputPassword4" className="form-label">Teléfono</label>
                            <input type="text" className="form-control" id="inputPhoneUserin" required onChange={user.phone != null && user.phone !== '' ? setPhone(user.phone) : (e) => setPhone(e.target.value)} defaultValue={user.phone != null ? user.phone : ''} disabled={user.phone != null && user.phone !== ''} />
                        </div>
                        <div className="col-12">
                            <label htmlFor="inputAddress" className="form-label">E-mail</label>
                            <input type="email" className="form-control" id="inputEmailUserin" required onChange={user.email != null && user.email !== '' ? setEmail(user.email) : (e) => setEmail(e.target.value)} defaultValue={user.email != null ? user.email : ''} disabled={user.email != null && user.email !== ''} />
                        </div>
                    </form>
                </div>
            </>
        );
    };

    let actualAddress = 0
    let addressQty = 0;
    let haveAdrress = false;
    if (!user.visit) {
        console.log(user.shippingAddress.length)
        addressQty = user.shippingAddress.length;
        console.log(addressQty)
        haveAdrress = user.shippingAddress != null && user.shippingAddress.length > 0;
    }


    const AddAdrressModal = () => {

        const myAliasAddress = () => {
            let value = '';
            switch (addressQty) {
                case 0: value = 'PRINCIPAL'; break;
                case 1: value = 'SECUNDARIA'; break;
                case 2: value = 'TERCERA'; break;
                case 3: value = 'CUARTA'; break;
                default: break;
            }
            setNewAlias = (text) => { newAlias = text };
            setNewAlias(value);
            return value;
        };

        setAlias = (text) => { alias = text }
        setAddressPhone = (text) => { addressPhone = text }
        setAddress = (text) => { address = text }
        setAddress2 = (text) => { address2 = text }
        setCity = (text) => { city = text }
        setRegion = (text) => { region = text }
        setPostalCode = (text) => { postalCode = text }
        setAdditional = (text) => { additional = text }
        console.log(alias);

        const selectPhone = () => {
            const mySwitch = document.getElementById('switch-same-phone');
            const myInput = document.getElementById('input-addres-phone-addresForm');
            if (mySwitch.checked && phone != null && phone !== '') {
                myInput.disabled = true;
                myInput.value = phone;
                setAddressPhone = (text) => { addressPhone = text }
                setAddressPhone(phone);
            } else {
                mySwitch.checked = false;
                myInput.disabled = false;
                myInput.value = '';
            }
        };
        return (
            <>
                {/* Boton checkout */}
                <div className='col py-3 ' key={'newAddress'} data-bs-toggle="modal" data-bs-target="#modalAddress">
                    <div className="card mx-auto" style={{ width: 9 + 'rem', height: 9 + 'rem' }}>
                        <div className="card-body text-center justify-content-center" >
                            <h6 className="card-title fw-bold">NUEVA DIRECCIÓN</h6>
                            <img src="/assets/images/utils/plus_1.png" className="card-img   rounded mx-auto d-block" style={{ width: 60 + 'px' }} alt="plus_1.png" />
                        </div>
                    </div>
                </div>

                {/* <!-- Modal --> */}
                <div className="modal fade modal-lg mx-auto" id="modalAddress" tabIndex="-1" aria-labelledby="modalAddressLabel" aria-hidden="true" onSubmit={(e) => { saveAddress(e) }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="container py-3">
                                <div className="container py-2">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="modalAddresassLabel2">DATOS DE ENVÍO</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                </div>

                                <div className="container py-1 mx-auto">
                                    <div className="container py-3">
                                        <div className=''>
                                            <form className="row g-3">
                                                <div className="col-6">
                                                    <label htmlFor="inputAlias" className="form-label">Alias</label>
                                                    <input type="text" className="form-control bg-light" id="insaputAliasUser" defaultValue={myAliasAddress()} required onChange={(e) => setAlias(e.target.value)} />
                                                </div>
                                                <div className="col-5 position-relative">
                                                    <label htmlFor="inputAddress" className="form-label">Teléfono</label>
                                                    <div className="div position-absolute top-0 end-0 form-check form-switch">
                                                        <input className="form-check-input" type="checkbox" role="switch" id="switch-same-phone" defaultChecked={phone != null && phone !== '' ? true : false} onChange={selectPhone} />
                                                        <label className="form-check-label" htmlFor="defaultCheck1">
                                                            Usar personal?
                                                        </label>
                                                    </div>
                                                    <input type="text" className="form-control" id="input-addres-phone-addresForm" required onChange={(e) => setAddressPhone(e.target.value)} disabled={phone != null && phone !== '' ? true : false} defaultValue={phone != null && phone !== '' ? phone : ''} />
                                                </div>
                                                <div className="col-12">
                                                    <label htmlFor="inputAddress" className="form-label">Dirección</label>
                                                    <input type="text" className="form-control" id="inputAddreassUser" placeholder="Av. Central 622" required onChange={(e) => setAddress(e.target.value)} />
                                                </div>
                                                <div className="col-12">
                                                    <label htmlFor="inputAddress2" className="form-label">Dirección 2</label>
                                                    <input type="text" className="form-control" id="inputAasddrdress2User" placeholder="Departamento, oficina, piso." required onChange={(e) => setAddress2(e.target.value)} />
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="inputCity" className="form-label">Ciudad</label>
                                                    <input type="text" className="form-control" id="inpsautCityUser" required onChange={(e) => setCity(e.target.value)} />
                                                </div>
                                                <div className="col-md-4">
                                                    <label htmlFor="inputState" className="form-label">Región</label>
                                                    <select id="inputStatsaeUser" className="form-select" defaultValue=' ' required onChange={(e) => setRegion(e.target.value)}>
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
                                                    <input type="text" className="form-control" id="inputPosastalUser" onChange={(e) => setPostalCode(e.target.value)} />
                                                </div>
                                                <div className="col-12">
                                                    <div className="mb-3">
                                                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Comentarios de envío</label>
                                                        <textarea className="form-control" id="inputAditisaonalUser" rows="3" onChange={(e) => setAdditional(e.target.value)}></textarea>
                                                    </div>
                                                </div>
                                                <div className="container py-2">
                                                    <div className="container">
                                                        <button type="submit" className="btn btn-outline-primary w-100 " >CONFIRMAR</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
    const cardAddres = (shippingAddres) => {
        actualAddress++;

        setAlias = (text) => { alias = text }
        setAddressPhone = (text) => { addressPhone = text }
        setAddress = (text) => { address = text }
        setAddress2 = (text) => { address2 = text }
        setCity = (text) => { city = text }
        setRegion = (text) => { region = text }
        setPostalCode = (text) => { postalCode = text }
        setAdditional = (text) => { additional = text }

        const selectRadio = (alias) => {
            const radioButtons = document.querySelector(`input[id="${alias}"]`);
            console.log(radioButtons);

            radioButtons.select();
            radioButtons.checked = true;

            const selectedAddress = user.shippingAddress.find(a => a.alias === alias);
            // console.log(selectedAddress);
            setAlias(alias)
            setAddressPhone(selectedAddress.phone || phone)
            setAddress(selectedAddress.address)
            setAddress2(selectedAddress.address2)
            setCity(selectedAddress.city)
            setRegion(selectedAddress.region)
            setPostalCode(selectedAddress.postalCode)
            setAdditional(selectedAddress.additional)

        }
        const maxAddress = 4;
        if (actualAddress <= maxAddress) {
            // const keyAlias = address.alias ? address.alias : 'addAddressKey'
            return (
                <>
                    <div className='col py-3' onClick={() => { selectRadio(shippingAddres.alias) }}>
                        <div className="card mx-auto" style={{ width: 275 + 'px', height: 300 + 'px' }}>
                            <div className="card-body" id='content-values' >
                                <div className="row mb-3">
                                    <div className="col-2">
                                        <input className="form-check-input me-1" type="radio" name="listGroupRadio_cardAddres" value="" id={`${shippingAddres.alias}`} />
                                    </div>
                                    <div className="col-7 text-end">
                                        <h5 className="card-title fw-bold">
                                            {shippingAddres.alias.toUpperCase()}
                                        </h5>
                                    </div>
                                </div>

                                <h6 className="card-subtitle mb-2 text-muted" >
                                    {shippingAddres.phone}
                                </h6>
                                <h5 className="card-subtitle  mb-4  my-3 text-center" style={{ fontSize: '19px' }}>
                                    {shippingAddres.address}, {shippingAddres.address2}, {shippingAddres.city}, {shippingAddres.region}
                                </h5>
                                <p className="card-subtitle  fw-bold mb-2 text-muted ">
                                    {shippingAddres.postalCode != null && shippingAddres.postalCode !== '' ? `Código postal: ${shippingAddres.postalCode}` : ''}
                                </p>

                                <p className="card-text text-muted">{shippingAddres.additional}</p>
                            </div>
                        </div>
                    </div>
                    {actualAddress === addressQty && actualAddress < maxAddress
                        ?
                        <AddAdrressModal />
                        : <></>}
                </>
            );
        }

    };
    const AddressComp = () => {
        return (
            <>
                <div className="row">{user.shippingAddress.map(cardAddres)}</div>
                <button className="btn btn-outline-primary w-100 fw-bold" onClick={proccessPay}>PROCEDER A PAGAR</button>
            </>
        );
    }
    return (
        <div>
            {user === 'visit'
                ?
                <ShippingVisitForm />
                : <>
                    {allData
                        ? <UserComplete user={user} />
                        : <UserForm user={user} />}
                    {haveAdrress
                        ? <AddressComp />
                        : <AddAdrressForm />}
                </>
            }
        </div>
    )
}

export default CheckoutShipping