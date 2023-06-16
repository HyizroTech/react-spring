import authHeader from './auth-header';
import httpClient from '../backendServices/http-common';

const getHeader = (id) => {
    return httpClient.get(`/header/${id}`, { headers: authHeader() });
};

const getFooter = (id) => {
    return httpClient.get(`/footer/${id}`, { headers: authHeader() });
};
const updateFooter = (id, data) => {
    return httpClient.put(`/footer/${id}`, data, { headers: authHeader() });
};
const updateHeader = (id, data) => {
    return httpClient.put(`/header/${id}`, data, { headers: authHeader() });
};
const uploadPhoto = (id, data) => {
    return httpClient.post(`/header/${id}`, data, { headers: authHeader() });
}
const deleteAccount = (id) => {
    return httpClient.delete(`/auth/user/${id}`, { headers: authHeader() })
}
const UserService = {
    getHeader,
    getFooter,
    updateFooter,
    updateHeader,
    uploadPhoto,
    deleteAccount
}
export default UserService;