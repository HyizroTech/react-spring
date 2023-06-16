import httpClient from './http-common';

const createCustomerEmployee = (id, data) => {
    return httpClient.post(`/customer/${id}/employee`, data);
}
const createRateEmployee = (id, data) => {
    return httpClient.post(`/rate/${id}/employee`, data);
}
const createBookingEntryEmployee = (id, data) => {
    return httpClient.post(`/bookingEntry/${id}/employee`, data);
}
const getCustomerEmployee = id => {
    return httpClient.get(`/customer/${id}/employees`);
}
const getRateEmployee = id => {
    return httpClient.get(`/rate/${id}/employees`);
}
const getBookingEntryEmployee = id => {
    return httpClient.get(`/bookingEntry/${id}/employees`);
}
const get = id => {
    return httpClient.get(`/employee/${id}`);
}
const updateEmployee = (id, data) => {
    return httpClient.put(`/employee/${id}`, data);
}
const deleteEmployee = id => {
    return httpClient.delete(`/employee/${id}`);
}



export default { createCustomerEmployee, createRateEmployee, getCustomerEmployee, getRateEmployee, get, updateEmployee, deleteEmployee, createBookingEntryEmployee, getBookingEntryEmployee };