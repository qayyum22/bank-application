import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/bank";

export const createAccount = (account) => {
  return axios.post(`${API_BASE_URL}/account`, account);
};

export const getAccount = (id) => {
  return axios.get(`${API_BASE_URL}/account/${id}`);
};

export const getAllAccounts = () => {
  return axios.get(`${API_BASE_URL}/accounts`);
};

export const createAccountHolder = (accountHolder) => {
  return axios.post(`${API_BASE_URL}/accountHolder`, accountHolder);
};

export const getAccountHolder = (id) => {
  return axios.get(`${API_BASE_URL}/accountHolder/${id}`);
};
