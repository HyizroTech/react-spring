import httpClient from './http-common';
import authHeader from '../AuthServices/auth-header';

const getProducts = id => {
    return httpClient.get(`/user/${id}/products`, { headers: authHeader() });
}

const getProduct = id => {
    return httpClient.get(`/product/${id}`, { headers: authHeader() })
}

const updateProduct = (id, data) => {
    return httpClient.put(`/product/${id}`, data, { headers: authHeader() })
}

const deleteProduct = id => {
    return httpClient.delete(`/product/${id}`, { headers: authHeader() })
}

export default { getProduct, getProducts, updateProduct, deleteProduct };