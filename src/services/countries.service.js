// src/services/countries.service.js
const httpClient = require('../utils/httpClient');
const cache = require('../utils/cache');

async function fetchAllCountries() {
  const key = 'countries_all';
  if (cache.has(key)) return cache.get(key);

  const url = 'https://restcountries.com/v3.1/all?fields=name,region,capital,population,flags';
  const { data } = await httpClient.get(url);
  cache.set(key, data);
  return data;
}

async function fetchByRegion(region) {
  const key = `countries_region_${region.toLowerCase()}`;
  if (cache.has(key)) return cache.get(key);

  const url = `https://restcountries.com/v3.1/region/${region}?fields=name,region,capital,population,flags`;
  const { data } = await httpClient.get(url);
  cache.set(key, data);
  return data;
}

async function fetchByName(name) {
  const key = `countries_name_${name.toLowerCase()}`;
  if (cache.has(key)) return cache.get(key);

  const url = `https://restcountries.com/v3.1/name/${name}?fields=name,region,capital,population,flags`;
  const { data } = await httpClient.get(url);
  cache.set(key, data);
  return data;
}

module.exports = { fetchAllCountries, fetchByRegion, fetchByName };
