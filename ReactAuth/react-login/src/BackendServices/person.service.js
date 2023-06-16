import httpClient from './http-common';
const getAll = () => {
    return httpClient.get('/person/get');
}

const create = data => {
    return httpClient.post("/person/create", data);
}
const deletePerson = id => {
    return httpClient.delete(`/person/delete/${id}`);
}

const get = id => {
    return httpClient.get(`/person/get/${id}`);
}

const update = (id, data) => {
    return httpClient.put(`/person/update/${id}`, data);
}
const uploadPhoto = (id, data) => {
    return httpClient.post(`/upload/${id}`, data);
}



export default { getAll, create, get, update, deletePerson, uploadPhoto };