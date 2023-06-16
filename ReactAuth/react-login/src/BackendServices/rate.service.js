import httpClient from './http-common';

const getAll = (id) => {
    return httpClient.get(`/project/${id}/rates`);
}

const create = (id, data) => {
    return httpClient.post(`/project/${id}/rate`, data);
}
const deleteRate = (id) => {
    return httpClient.delete(`/rate/${id}`);
}

const update = (id, data) => {
    return httpClient.put(`/rate/${id}`, data);
}
const get = (id) => {
    return httpClient.get(`/rate/${id}`);
}

export default { getAll, create, update, deleteRate, get };