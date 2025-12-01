// src/docs/openapi.js

const PORT = process.env.PORT || 3000;

module.exports = {
  openapi: '3.0.0',
  info: {
    title: 'Praktikum #9 - API Integration (Modular)',
    version: '1.0.0',
    description: 'Web Service modul untuk mengintegrasikan API eksternal (REST Countries + OWM)'
  },
  servers: [
    { url: `http://localhost:${PORT}` }
  ],
  paths: {
    '/api/countries': {
      get: {
        summary: 'Ambil semua negara',
        responses: { '200': { description: 'OK' } }
      }
    },

    '/api/countries/region/{region}': {
      get: {
        summary: 'Ambil negara berdasarkan region',
        parameters: [
          { name: 'region', in: 'path', required: true, schema: { type: 'string' } }
        ],
        responses: { '200': { description: 'OK' }, '400': { description: 'Bad Request' } }
      }
    },

    '/api/countries/name/{name}': {
      get: {
        summary: 'Cari negara berdasarkan nama',
        parameters: [
          { name: 'name', in: 'path', required: true, schema: { type: 'string' } }
        ],
        responses: { '200': { description: 'OK' }, '404': { description: 'Not Found' } }
      }
    },

    '/api/weather': {
      get: {
        summary: 'Ambil cuaca kota',
        parameters: [
          { name: 'city', in: 'query', required: false, schema: { type: 'string' } }
        ],
        responses: { '200': { description: 'OK' }, '400': { description: 'API key tidak diset' } }
      }
    }
  }
};
