import httpClient from './http-common';

const createCustomerProject = (id, data) => {
    return httpClient.post(`/customer/${id}/project`, data);
}
const deleteProject = id => {
    return httpClient.delete(`/project/${id}`);
}
const getAllProjects = id => {
    return httpClient.get(`/customer/${id}/projects`);
}
const get = (id) => {
    return httpClient.get(`/project/${id}`);
}
const updateProject = (id, data) => {
    return httpClient.put(`/project/${id}`, data);
}



export default { createCustomerProject, deleteProject, get, getAllProjects, updateProject };