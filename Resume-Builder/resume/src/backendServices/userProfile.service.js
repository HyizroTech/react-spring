import httpClient from './http-common';
import authHeader from '../AuthServices/auth-header';


const createUser = (id, data) => {
    return httpClient.post(`/userLogin/${id}/profile`, data, { headers: authHeader() });
}

const uploadPhoto = (id, data) => {
    return httpClient.post(`/user/${id}`, data, { headers: authHeader() })
}

const getUsers = () => {
    return httpClient.get(`/user/get`, { headers: authHeader() });
}

const getUser = id => {
    return httpClient.get(`/user/${id}`, { headers: authHeader() })
}

const updateUser = (id, data) => {
    return httpClient.put(`/user/${id}`, data, { headers: authHeader() })
}

const deleteUser = id => {
    return httpClient.delete(`/user/${id}`, { headers: authHeader() })
}

export default { getUsers, getUser, updateUser, deleteUser, createUser, uploadPhoto };