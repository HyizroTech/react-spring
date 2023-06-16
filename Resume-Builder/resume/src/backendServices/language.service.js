import httpClient from './http-common';
import authHeader from '../AuthServices/auth-header';

const getLanguages = id => {
    return httpClient.get(`/user/${id}/languages`, { headers: authHeader() });
}

const getLanguage = id => {
    return httpClient.get(`/language/${id}`, { headers: authHeader() })
}

const updateLanguage = (id, data) => {
    return httpClient.put(`/language/${id}`, data, { headers: authHeader() })
}

const deleteLanguage = id => {
    return httpClient.delete(`/language/${id}`, { headers: authHeader() })
}

export default { getLanguage, getLanguages, updateLanguage, deleteLanguage };