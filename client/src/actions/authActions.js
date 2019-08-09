import axios from 'axios';
import jwt_decode from 'jwt-decode';

import setAuthToken from '../util/setAuthToken';


import {
    USER_NAME,
    USER_EMAIL,
    USER_PASSWORD,
    USER_PASSWORD2,
    GET_ERRORS,

    SET_CURRENT_USER
} from './types';

// Resgister User
export const registerUser = (userData, history) => dispatch => {
    axios.post('/api/users/signup', userData)
        .then(res => {
            history.push('/login')
        })
        .catch(err => {
            console.log(err.response)
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}


// User Logout
export const logoutUser = () => dispatch => {
    console.log('aaa')
    // Remove token from local storage
    localStorage.removeItem('jwtToken')
    // Remove auth header for future requests
    setAuthToken(false)
    // set current user
    dispatch(setCurrentUser({}))
    
}

export const userLogin = (userData) => dispatch => {
    console.log(userData)
    // console.log(history) 
    axios.post('/api/users/login', userData)
        .then(res => {
            // Save to local storage
            const { token } = res.data
            // Set token to local storage
            localStorage.setItem('jwtToken', token)
            // Set token to auth header
            setAuthToken(token)
            // Decode user data form token
            const decoded = jwt_decode(token)
            // Set current user
            dispatch(setCurrentUser(decoded))
        })
        .catch(err => {
            console.log(err.response)
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}

export const userName = (userData) => {
    return {
        type: USER_NAME,
        payload: userData
    }
}

export const userEmail = (userData) => {
    return {
        type: USER_EMAIL,
        payload: userData
    }
}

export const userPassword = (userData) => {
    return {
        type: USER_PASSWORD,
        payload: userData
    }
}

export const userPassword2 = (userData) => {
    return {
        type: USER_PASSWORD2,
        payload: userData
    }
}

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}