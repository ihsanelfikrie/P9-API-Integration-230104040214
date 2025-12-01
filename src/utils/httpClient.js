const axios = require('axios');

/**
 * HTTP Client wrapper menggunakan Axios
 * Menyediakan fungsi untuk melakukan request HTTP
 */
const httpClient = axios.create({
  timeout: 10000, // 10 detik timeout
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Interceptor untuk logging request
httpClient.interceptors.request.use(
  (config) => {
    console.log(`[HTTP Request] ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor untuk logging response
httpClient.interceptors.response.use(
  (response) => {
    console.log(`[HTTP Response] ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    if (error.response) {
      console.error(`[HTTP Error] ${error.response.status} ${error.config.url}`);
    } else {
      console.error(`[HTTP Error] ${error.message}`);
    }
    return Promise.reject(error);
  }
);

module.exports = httpClient;