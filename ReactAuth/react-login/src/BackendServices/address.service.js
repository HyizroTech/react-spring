import httpClient from './http-common';

const createPersonAddress = (id, data) => {
    return httpClient.post(`/person/${id}/address`, data);
}
const createFacilitatorAddress = (id, data) => {
    return httpClient.post(`/facilitator/${id}/address`, data);
}
const createCustomerAddress = (id, data) => {
    return httpClient.post(`/customer/${id}/address`, data);
}
const getPersonAdresses = id => {
    return httpClient.get(`/person/${id}/addresses`);
}
const getFacilitatorAddresses = id => {
    return httpClient.get(`/facilitator/${id}/addresses`);
}
const getCustomerAddresses = id => {
    return httpClient.get(`/customer/${id}/addresses`);
}
const get = id => {
    return httpClient.get(`/address/${id}`);
}
const updateAddress = (id, data) => {
    return httpClient.put(`/address/${id}`, data);
}
const deleteAddress = id => {
    return httpClient.delete(`/address/${id}`);
}


export default { createPersonAddress, createFacilitatorAddress, createCustomerAddress, getPersonAdresses, getFacilitatorAddresses, getCustomerAddresses, get, updateAddress, deleteAddress };