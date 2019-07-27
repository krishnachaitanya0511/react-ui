import axios from 'axios';
import API from '../../components/common/APIHelper';
import Token from '../../components/common/Token';

import { CREATE_USER_SUCCESS,
         CREATE_USER_ERROR,
         GET_USER_ERROR,
         GET_USER_SUCCESS,
         UPDATE_USER_SUCCESS,
         AUTHENTICATE_USER_ERROR,
         AUTHENTICATE_USER_SUCCESS,
         USER_SHOW_LOADING,
         SIGNOUT_USER } from '../types/userTypes';

export const updateUser = (user) => {
    return (dispatch, getState) => {        
        dispatch({ type: UPDATE_USER_SUCCESS, user });
    }
}

export const createUser = (user) => {
    return (dispatch, getState) => {
        dispatch({ type: USER_SHOW_LOADING });           
        axios.post(API.URI + 'api/users', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'text/plain'                    
                },
                mode: 'cors',
                username: user.username,
                email: user.email,
                password: user.password
            }
        ).then( response => {                
                dispatch({ type: CREATE_USER_SUCCESS, response: response.data });
            }
        ).catch(error => {			
            dispatch({ type: CREATE_USER_ERROR, error });
        });            
    }
}

export const getUser = () => {
    return (dispatch, getState) => {
        dispatch({ type: USER_SHOW_LOADING });   
        const token = Token.get_token();
        axios.get(API.URI + 'api/users/username?username=' + token['username'], {
            headers: {
                'Content-Type': 'application/json',
                token: token['token'],
                username: token['username']
            },
            mode: 'cors'
        }).then( response => {
            dispatch({ type: GET_USER_SUCCESS, response: response.data });
        }
        ).catch(error => {			
            dispatch({ type: GET_USER_ERROR, error });
        });
    }
}

export const authenticateUser = (user) => {
    return (dispatch, getState) => {
        dispatch({ type: USER_SHOW_LOADING });        
        axios.post(API.URI + 'api/GetToken', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'text/plain'
                },
                mode: 'cors',
                username: user.username,
                password: user.password
            }
        ).then( response => {
            if(response.data['status'] === 'success') {
                // Ask user if he/she is okay to save local cookies then save the token to localStorage by 
                // Token.set_token(response.data['auth_token'], response.data['username'])
                dispatch({ type: AUTHENTICATE_USER_SUCCESS, response: response.data });
            }
            else {
                // Do this, Token.remove_token(); if Token.set_token() is done above
                dispatch({ type: AUTHENTICATE_USER_ERROR, error: response.data });
            }
        }
        ).catch(error => {
            // Do this, Token.remove_token(); if Token.set_token() is done above
            dispatch({ type: AUTHENTICATE_USER_ERROR, error });
        });        
    }
}

export const signOutUser = (auth) => {
    return (dispatch, getState) => {
        dispatch({ type: USER_SHOW_LOADING });
        dispatch({ type: SIGNOUT_USER, auth });                
    }
}

export const validateToken = (auth) => {
    return (dispatch, getState) => { 
        dispatch({ type: USER_SHOW_LOADING });       
        axios.post(API.URI + 'api/ValidateToken', {
            headers: {
                'Content-Type': 'application/json',
                token: auth['token'],
                username: auth['username']
            },
            mode: 'cors',
            username: auth['username'],
            token: auth['token']
        }).then( response => {
            if(response.data['status'] === 'success') {
                response.data['auth_token'] = auth['token'];
                response.data['username'] = auth['username']; 
                dispatch({ type: AUTHENTICATE_USER_SUCCESS, response: response.data });
            }                                            
            else {
                Token.remove_token();
                dispatch({ type: AUTHENTICATE_USER_ERROR, error: response.data });
            }
        }).catch(error => {
            Token.remove_token();
            dispatch({ type: AUTHENTICATE_USER_ERROR, error });
        });
    }
}