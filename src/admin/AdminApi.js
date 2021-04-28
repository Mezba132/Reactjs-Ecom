import {API} from "../config";

export const createCategory = (userId, token, category) => {
    return fetch(`${API}/category/create/${userId}`, {
        method : 'post',
        headers : {
            Accept : 'application/json',
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
        },
        body : JSON.stringify(category)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
}

export const createProduct = (userId, token, product) => {
    return fetch(`${API}/product/create/${userId}`, {
        method : 'post',
        headers : {
            Accept : 'application/json',
            'Authorization' : `Bearer ${token}`
        },
        body : product
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
}

export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method: 'get'
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

export const listOrders = (userId, token) => {
    return fetch(`${API}/order/list/${userId}`, {
        method:'get',
        headers : {
            Accept : 'application/json',
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

export const getStatusValues = (userId, token) => {
    return fetch(`${API}/order/status-values/${userId}`, {
        method:'get',
        headers : {
            Accept : 'application/json',
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

export const updateOrderStatus = (userId, token, orderId, status) => {
    return fetch(`${API}/order/${orderId}/status/${userId}`, {
        method:'put',
        headers : {
            Accept : 'application/json',
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
        },
        body: JSON.stringify({ status, orderId })
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}