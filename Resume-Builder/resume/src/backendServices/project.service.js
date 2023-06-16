import httpClient from './http-common';
import authHeader from '../AuthServices/auth-header';

const getProjects = id => {
    return httpClient.get(`/user/${id}/projects`, { headers: authHeader() });
}

const getProject = id => {
    return httpClient.get(`/project/${id}`, { headers: authHeader() })
}

const updateProject = (id, data) => {
    return httpClient.put(`/project/${id}`, data, { headers: authHeader() })
}

const deleteProject = id => {
    return httpClient.delete(`/project/${id}`, { headers: authHeader() })
}

export default { getProjects, getProject, updateProject, deleteProject };