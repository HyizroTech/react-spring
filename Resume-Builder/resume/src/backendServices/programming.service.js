import httpClient from './http-common';
import authHeader from '../AuthServices/auth-header';

const getProgrammings = id => {
    return httpClient.get(`/user/${id}/programmings`, { headers: authHeader() });
}

const getProgramming = id => {
    return httpClient.get(`/programming/${id}`, { headers: authHeader() })
}

const updateProgramming = (id, data) => {
    return httpClient.put(`/programming/${id}`, data, { headers: authHeader() })
}

const deleteProgramming = id => {
    return httpClient.delete(`/programming/${id}`, { headers: authHeader() })
}

export default { getProgrammings, getProgramming, updateProgramming, deleteProgramming };