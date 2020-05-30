import Toasts from "../../components/secondarys/toasts";
import { getError } from "../../utils/utils";

// localStorage.clear();
const initialState = {
    userInfo: localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null,

    cart: {
        shippingAddress: localStorage.getItem('shippingAddress')
            ? JSON.parse(localStorage.getItem('shippingAddress'))
            : {},
        billingAddress: localStorage.getItem('billingAddress')
            ? JSON.parse(localStorage.getItem('billingAddress'))
            : {},
        paymentMethod: localStorage.getItem('paymentMethod')
            ? JSON.parse(localStorage.getItem('paymentMethod'))
            : '',
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : []
    }
};

const controlItems = (state = initialState, action) => {

    let actualCart = state.cart.cartItems;
    switch (action.type) {
        case 'ADDITEM':
            try {
                const product_in = action.payload;
                let product_before;
                if (product_in) {
                    product_before = state.cart.cartItems.find(x => x.id === product_in.id);
                }
                if (product_before == null || product_before.qty == null || product_before.qty < product_in.stock) {
                    //Check if Product is Already Exist
                    const exist = state.cart.cartItems.find((x) => x.id === product_in.id);
                    if (exist) {
                        //Increase Quantity
                        actualCart = state.cart.cartItems.map((x) => x.id === product_in.id ? { ...x, qty: x.qty + 1 } : x);
                    } else {
                        actualCart = [
                            ...state.cart.cartItems,
                            {
                                ...product_in,
                                qty: 1,
                            }
                        ]
                    }
                } else {
                    window.alert('Lo siento. Stock insuficiente...');
                }
                const valueReturn = { ...state, cart: { ...state.cart, cartItems: actualCart } };
                localStorage.setItem('cartItems', JSON.stringify(actualCart));
                return valueReturn;
            } catch (error) {
                console.log(error.stack);
                console.log(error.stack);
                Toasts(getError(error));
                return;
            }
        case 'RESTITEM':
            try {
                const product_in = action.payload;
                const exist_del = state.cart.cartItems.find((x) => x.id === product_in.id);
                if (exist_del && exist_del.qty === 1) {
                    actualCart = state.cart.cartItems.filter((x) => x.id !== exist_del.id);
                } else if (exist_del && exist_del.qty > 1) {
                    actualCart = state.cart.cartItems.map((x) => x.id === product_in.id ? { ...x, qty: x.qty - 1 } : x);
                }
                const valueReturn = { ...state, cart: { ...state.cart, cartItems: actualCart } };
                localStorage.setItem('cartItems', JSON.stringify(actualCart));
                return valueReturn;
            } catch (error) {
                console.log(error.stack);
                Toasts(getError(error));
                return;
            }
        case 'DELITEM':
            actualCart = state.cart.cartItems = state.cart.cartItems.filter((x) => {
                return x.id !== action.payload.id
            })
            const valueReturn = { ...state, cart: { ...state.cart, cartItems: actualCart } };
            localStorage.setItem('cartItems', JSON.stringify(actualCart));
            return valueReturn;
        case 'CLEAR_CART':

            return { ...state, cart: {} };

        case 'USER_SIGNIN':
            return { ...state, userInfo: action.payload };
        case 'USER_SIGNOUT':
            return {
                ...state, userInfo: null,
                cart: {
                    cartItems: [],
                    shippingAddress: {},
                    paymentMethod: '',
                }
            };
        case 'SAVE_SHIPPING_ADDRESS':
            return {
                ...state,
                cart: {
                    ...state.cart,
                    shippingAddress: action.payload
                }
            }
        case 'SAVE_BILLING_ADDRESS':
            return {
                ...state,
                cart: {
                    ...state.cart,
                    billingAddress: action.payload
                }
            }
        case 'SAVE_PAYMENT_METHOD':
            return {
                ...state,
                cart: {
                    ...state.cart,
                    paymentMethod: action.payload
                }
            }

        default: return state;
    }
}

export default controlItems;