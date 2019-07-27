import axios from 'axios';
import API from '../../components/common/APIHelper';
import {CREATE_PRODUCT_SUCCESS, 
        CREATE_PRODUCT_ERROR, 
        GET_PRODUCTS_SUCCESS, 
        GET_PRODUCTS_ERROR,
        GET_PRODUCT_ERROR,
        GET_PRODUCT_SUCCESS, 
        PRODUCT_SHOW_LOADING } from '../types/productTypes';

export const createProduct = (product) => {    
    return (dispatch, getState) => {
        dispatch({ type: PRODUCT_SHOW_LOADING });
        axios.post(API.URI + 'api/products', {
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token'),
                    'username': localStorage.getItem('username')
                },
                mode: 'cors',
                product: product.product,                
                description: product.description                
            }
        ).then( function(response) {
            dispatch({ type: CREATE_PRODUCT_SUCCESS, response });
        }).catch(error => {			
            dispatch({ type: CREATE_PRODUCT_ERROR, error });
        });        
    }
}

export const getProducts = (params) => {
    return (dispatch, getState) => {
        dispatch({ type: PRODUCT_SHOW_LOADING });
        var full_uri = API.URI + 'api/products'; 
		if (params.creator_id === '')
			full_uri = full_uri + '/latest/' + params.count
		else
			full_uri = full_uri + '/creator/' + params.creator_id +'/latest/' + params.count

		axios.get(full_uri, {
				headers: {
					'Content-Type': 'application/json'
				},
				mode: 'cors'    
		}).then( response => {											            
            dispatch({ type: GET_PRODUCTS_SUCCESS, response: response.data });
		}).catch(error => {			
            dispatch({ type: GET_PRODUCTS_ERROR, error });
        });         
    }
}

export const getProduct = (params) => {
    return (dispatch, getState) => {
        dispatch({ type: PRODUCT_SHOW_LOADING });
        axios.get(API.URI + 'api/products?id=' + params.id, {
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors'    
        }).then( response => {            
            dispatch({ type: GET_PRODUCT_SUCCESS, product: response.data.product });            
        }).catch(error => {			
            dispatch({ type: GET_PRODUCT_ERROR, error });
        });
    }
}