import httpClient from './http-common';

const getAll = () => {
    return httpClient.get('/group/get');
}

const create = data => {
    return httpClient.post("/group/create", data);
}
const deleteGroup = id => {
    return httpClient.delete(`/group/delete/${id}`);
}

const get = id => {
    return httpClient.get(`/group/get/${id}`);
}

const update = (id, data) => {
    return httpClient.put(`/group/update/${id}`, data);
}


export default { getAll, create, get, update, deleteGroup };