import httpClient from './http-common';

const getAll = () => {
    return httpClient.get('/configData/get');
}

const create = data => {
    return httpClient.post("/configData/create", data);
}
const deleteData = id => {
    return httpClient.delete(`/configData/delete/${id}`);
}

const get = id => {
    return httpClient.get(`/configData/get/${id}`);
}

const update = (id, data) => {
    return httpClient.put(`/configData/update/${id}`, data);
}


export default { getAll, create, get, update, deleteData };