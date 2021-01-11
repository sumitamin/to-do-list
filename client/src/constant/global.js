import axios from 'axios';

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('utoken');
  config.url = `${API_URL}${config.url}`
  if (token)
    config.headers['Authorization'] = 'Bearer ' + token;
  
  config.headers['content-type'] = 'application/json';
  return config;
 
}, error => {
  return Promise.reject(error);
});

axios.interceptors.response.use(
  res => res,
  err => {
    console.log(' err ', err)
    if (err.response.status === 401) {
      localStorage.removeItem('utoken');
    }
    throw err;
  }
);

export const API_URL = 'http://localhost:3000/api/';