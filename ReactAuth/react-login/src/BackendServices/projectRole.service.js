import httpClient from './http-common';

const update = (id, data) => {
    return httpClient.put(`/projectRole/${id}`, data);
}

const deleteProjectRole = id => {
    return httpClient.delete(`/projectRole/${id}`);
}

const get = id => {
    return httpClient.get(`/projectRole/${id}`);
}

export default { update, deleteProjectRole, get };