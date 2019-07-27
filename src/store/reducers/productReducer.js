import { CREATE_PRODUCT_SUCCESS, CREATE_PRODUCT_ERROR, GET_PRODUCT_SUCCESS, GET_PRODUCT_ERROR, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_ERROR, UPDATE_PRODUCT_SUCCESS, DELETE_PRODUCT_SUCCESS, PRODUCT_SHOW_LOADING } from '../types/productTypes';

const initState = {
    response: null,
    status: '',
    products: [],
    current_product: null,
    error: null,
    loading: false    
}

const productReducer = (state = initState, action) => {
    switch(action.type) {
        case CREATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                status: CREATE_PRODUCT_SUCCESS,
                response: action.response
            }
        case CREATE_PRODUCT_ERROR:    
            return {
                ...state,
                loading: false,
                status: CREATE_PRODUCT_ERROR,
                error: action.error
            }
        case GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                status: GET_PRODUCTS_SUCCESS,
                products: action.response.products,
                response: action.response
            }
        case GET_PRODUCTS_ERROR:
            return {
                ...state,
                loading: false,
                status: GET_PRODUCTS_ERROR,
                products: [],
                error: action.error
            }
        case GET_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                status: GET_PRODUCT_SUCCESS,
                products: [],
                current_product: action.product,
                response: action.response
            }
        case GET_PRODUCT_ERROR:
            const empty = {
                'product' : '<---->',
                'parent_product_id' : '<---->',
                'description': '<---->',
                'creator_id': '<---->',
            };
            return {
                ...state,
                loading: false,
                current_product: empty,
                products: [],
                status: GET_PRODUCT_ERROR,
                error: action.error
            }
        case UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                status: UPDATE_PRODUCT_SUCCESS,
                response: action.response
            }
        case PRODUCT_SHOW_LOADING:
            return {
                ...state,
                loading: true            
            }
        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                status: DELETE_PRODUCT_SUCCESS,                
                response: action.response
            }
        default:
            return state;
    }
}

export default productReducer