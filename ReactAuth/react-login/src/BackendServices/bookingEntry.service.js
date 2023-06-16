import httpClient from './http-common';

const getAll = () => {
    return httpClient.get('/bookingEntry/get');
}

const create = data => {
    return httpClient.post("/bookingEntry/create", data);
}
const deleteBookingEntry = id => {
    return httpClient.delete(`/bookingEntry/delete/${id}`);
}

const get = id => {
    return httpClient.get(`/bookingEntry/get/${id}`);
}

const update = (id, data) => {
    return httpClient.put(`/bookingEntry/update/${id}`, data);
}


export default { getAll, create, get, update, deleteBookingEntry };