import httpClient from './http-common';
import authHeader from '../AuthServices/auth-header';

const getDescriptions = id => {
    return httpClient.get(`/project/${id}/descriptions`, { headers: authHeader() });
}

const getDescription = id => {
    return httpClient.get(`/description/${id}`, { headers: authHeader() })
}

const updateDescription = (id, data) => {
    return httpClient.put(`/description/${id}`, data, { headers: authHeader() })
}

const deleteDescription = id => {
    return httpClient.delete(`/description/${id}`, { headers: authHeader() })
}

export default { getDescriptions, getDescription, updateDescription, deleteDescription };