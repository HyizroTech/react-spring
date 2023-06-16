import httpClient from './http-common';
import authHeader from '../AuthServices/auth-header';

const getStandards = id => {
    return httpClient.get(`/user/${id}/standards`, { headers: authHeader() });
}

const getStandard = id => {
    return httpClient.get(`/standard/${id}`, { headers: authHeader() })
}

const updateStandard = (id, data) => {
    return httpClient.put(`/standard/${id}`, data, { headers: authHeader() })
}

const deleteStandard = id => {
    return httpClient.delete(`/standard/${id}`, { headers: authHeader() })
}

export default { getStandards, getStandard, updateStandard, deleteStandard };