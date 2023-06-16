import httpClient from './http-common';

const getAll = () => {
    return httpClient.get('/facilitator/get');
}

const create = data => {
    return httpClient.post("/facilitator/create", data);
}
const deleteFacilitator = id => {
    return httpClient.delete(`/facilitator/delete/${id}`);
}

const get = id => {
    return httpClient.get(`/facilitator/get/${id}`);
}

const update = (id, data) => {
    return httpClient.put(`/facilitator/update/${id}`, data);
}


export default { getAll, create, get, update, deleteFacilitator };