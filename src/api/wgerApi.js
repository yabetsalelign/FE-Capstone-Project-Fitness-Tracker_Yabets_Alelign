import axios from 'axios';

const BASE_URL = 'https://wger.de/api/v2/';
const API_TOKEN = '78b796b42a4985a9e3858a3887bca16c1cf53b83';  // Permanent token

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

// Automatically attach the permanent token for every request
api.interceptors.request.use((config) => {
  if (API_TOKEN) {
    config.headers['Authorization'] = `Token ${API_TOKEN}`;  // Attach token to headers
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Function to handle GET requests
export const apiGet = async (endpoint) => {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error.response);
    throw error;
  }
};

// Function to handle POST requests
export const apiPost = async (endpoint, data) => {
  try {
    const response = await api.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error(`Error posting data to ${endpoint}:`, error.response);
    throw error;
  }
};