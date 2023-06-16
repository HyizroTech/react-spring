import httpClient from './http-common';
import authHeader from '../AuthServices/auth-header';

const generatePDF = (id, data) => {
    return httpClient.post(`/user/${id}/resume`, data, { headers: authHeader() });
}


export default { generatePDF };