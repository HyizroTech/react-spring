import httpClient from './http-common';

const getAll = () => {
    return httpClient.get('/user/get');
}

const create = data => {
    return httpClient.post("/user/create", data);
}
const deleteUser = id => {
    return httpClient.delete(`/user/delete/${id}`);
}

const get = id => {
    return httpClient.get(`/user/get/${id}`);
}

const update = (id, data) => {
    return httpClient.put(`/user/update/${id}`, data);
}


export default { getAll, create, get, update, deleteUser };