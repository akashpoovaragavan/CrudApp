import axios from 'axios';

const API_BASE_URL = 'https://crudcrud.com';

export const appAxios = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  responseType: 'json',
});
