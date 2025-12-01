const axios = require('axios');

const httpClient = axios.create({
  timeout: 15000
});

module.exports = httpClient;
