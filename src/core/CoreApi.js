import {API} from "../config";

export const getProducts = (sortBy) => {
    return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=5`, {
        method: 'get'
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
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

export const getFilteredProducts = (skip, limit, filters = {}) => {
    const data = {
        skip,
        limit,
        filters
    }
    return fetch(`${API}/products/by/search`, {
        method: 'post',
        headers : {
            Accept : 'application/json',
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(data)
    })
    .then(response => {
        return response.json()
    })
    .catch( err => console.log(err))
}