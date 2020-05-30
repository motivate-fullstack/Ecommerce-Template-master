export const addItem = (product) => {
    return {
        type: 'ADDITEM',
        payload: product,
    }
}
export const restItem = (product) => {
    return {
        type: 'RESTITEM',
        payload: product,
    }
}
export const deleteItem = (product) => {
    return {
        type: 'DELITEM',
        payload: product,
    }
}
export const signin = (data) => {
    return {
        type: 'USER_SIGNIN',
        payload: data,
    }
}

export const signout = () => {
    return {
        type: 'USER_SIGNOUT',
        payload: null,
    }
}
export const saveShippingAddress = (data) => {
    return {
        type: 'SAVE_SHIPPING_ADDRESS',
        payload: data,
    }
}
export const saveBillingAddress = (data) => {
    return {
        type: 'SAVE_BILLING_ADDRESS',
        payload: data,
    }
}
export const savePaymentMethod = (data) => {
    return {
        type: 'SAVE_PAYMENT_METHOD',
        payload: data,
    }
}
export const clearCart = () => {
    return {
        type: 'CLEAR_CART',
        payload: null,
    }
}
