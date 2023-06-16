import httpClient from './http-common';
import authHeader from '../AuthServices/auth-header';

const getKnowledges = id => {
    return httpClient.get(`/user/${id}/knowledges`, { headers: authHeader() });
}

const getKnowledge = id => {
    return httpClient.get(`/knowledge/${id}`, { headers: authHeader() })
}

const updateKnowledge = (id, data) => {
    return httpClient.put(`/knowledge/${id}`, data, { headers: authHeader() })
}

const deleteKnowledge = id => {
    return httpClient.delete(`/knowledge/${id}`, { headers: authHeader() })
}

export default { getKnowledges, getKnowledge, updateKnowledge, deleteKnowledge };