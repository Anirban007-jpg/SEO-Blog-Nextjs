import fetch from 'isomorphic-fetch';
import {API} from '../config';
import cookie from 'js-cookie';

export const signup = (user) => {
    return fetch(`${API}/signup`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type" : "application/json",
            // Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        return response.json();
    }).catch(err => console.log(err))
}

export const signin = (user) => {
    return fetch(`${API}/signin`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type" : "application/json",
            // Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        return response.json();
    }).catch(err => console.log(err))
}

// set cookie
export const setCookie = (key, value) => {
    if(process.browser){
        cookie.set(key, value, {
            expires: 1
        });
    }
};

// remove cookie
export const removeCookie = (key) => {
    if(process.browser){
        cookie.set(key, {
            expires: 1
        });
    }
};

// get cookie
export const getCookie = (key) => {
    if(process.browser){
        cookie.get(key);
    }
};

// localStrorage
export const setLocalStorage = (key,value) => {
    if (process.browser){
        localStorage.setItem(key, JSON.stringify(value))
    }
}


export const removeLocalStorage = (key,value) => {
    if (process.browser){
        localStorage.removeItem(key)
    }
}


// authenticate user by pass data to cookie and localstorage
export const authenticate = (data,next) => {
    setCookie('token', data.token);
    setLocalStorage('user', data.user);
    next();
}

// this will give authentication user data

export const isAuth = () => {
    if (process.browser){
        const cookieChecked = getCookie(token);
        if (cookieChecked){
            if (localStorage.getItem('user')){
                return JSON.parse(localStorage.getItem('user'));
            }else{
                return false;
            }
        }
    }
}