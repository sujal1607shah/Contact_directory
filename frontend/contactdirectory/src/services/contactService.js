import axios from "axios"

const API="http://localhost:8000/api/contacts"

export const getAllContacts = () => axios.get(API);
export const getContact = (id) => axios.get(`${API}/${id}`);
export const createContact = (data) => axios.post(API, data);
export const updateContact = (id, data) => axios.put(`${API}/${id}`, data);
export const deleteContact = (id) => axios.delete(`${API}/${id}`);
