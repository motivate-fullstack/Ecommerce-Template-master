import { useEffect, useReducer } from 'react'
import axios from 'axios';
// import logger from 'use-reducer-logger'

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':

            return { ...state, loading: true };
        case 'FETCH_SUCCESS':

            return { ...state, products: action.payload, loading: false };
        case 'FETCH_FAIL':

            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};

export const Products_sv = () => {
    const [{ loading, error, products }, dispatch] = useReducer((reducer), {
        products: [],
        loading: true,
        error: ''
    });
    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get('/api/products');
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
            } catch (error) {
                dispatch({ type: 'FETCH_FAIL', payload: error.message });
                console.log(error.stack);
            }
        };
        fetchData();
    }, []);
    return loading ? loading : error ? { error: true, message: error } : products;
};

export const Product_sv = (id) => {
    const [{ loading, error, products }, dispatch] = useReducer((reducer), {
        products: [],
        loading: true,
        error: ''
    });
    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get(`/api/products/${id}`);
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
            } catch (error) {
                dispatch({ type: 'FETCH_FAIL', payload: error.message });
                console.log(error.stack);
            }
        };
        fetchData();
    }, [id]);
    return loading ? loading : error ? { error: true, message: error } : products;
};



// export default Products_sv;
// export default Product_sv;