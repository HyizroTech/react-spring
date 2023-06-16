import httpClient from './http-common';

const getAll = () => {
    return httpClient.get('/customer/get');
}

const create = data => {
    return httpClient.post("/customer/create", data);
}
const deleteCustomer = id => {
    return httpClient.delete(`/customer/delete/${id}`);
}

const get = id => {
    return httpClient.get(`/customer/get/${id}`);
}

const update = (id, data) => {
    return httpClient.put(`/customer/update/${id}`, data);
}



export default { getAll, create, get, update, deleteCustomer };