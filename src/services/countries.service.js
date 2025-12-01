const httpClient = require('../utils/httpClient');
const cache = require('../utils/cache');

const BASE_URL = 'https://restcountries.com/v3.1';

/**
 * Mendapatkan semua negara dengan fields tertentu
 * @param {string} fields - Fields yang ingin ditampilkan
 * @returns {Promise<Array>} - List negara
 */
const getAllCountries = async (fields = 'name,capital,region,population,flags') => {
  const cacheKey = `countries_all_${fields}`;
  
  // Cek cache terlebih dahulu
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    console.log('[Cache Hit] All countries');
    return cachedData;
  }

  // Jika tidak ada di cache, ambil dari API
  const response = await httpClient.get(`${BASE_URL}/all?fields=${fields}`);
  
  // Simpan ke cache
  cache.set(cacheKey, response.data);
  console.log('[Cache Miss] All countries - Data cached');
  
  return response.data;
};

/**
 * Mendapatkan negara berdasarkan region
 * @param {string} region - Nama region (asia, europe, africa, dll)
 * @param {string} fields - Fields yang ingin ditampilkan
 * @returns {Promise<Array>} - List negara di region tersebut
 */
const getCountriesByRegion = async (region, fields = 'name,capital,region,population,flags') => {
  const cacheKey = `countries_region_${region}_${fields}`;
  
  // Cek cache
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    console.log(`[Cache Hit] Countries in region: ${region}`);
    return cachedData;
  }

  // Ambil dari API
  const response = await httpClient.get(`${BASE_URL}/region/${region}?fields=${fields}`);
  
  // Simpan ke cache
  cache.set(cacheKey, response.data);
  console.log(`[Cache Miss] Countries in region: ${region} - Data cached`);
  
  return response.data;
};

/**
 * Mencari negara berdasarkan nama
 * @param {string} name - Nama negara
 * @param {string} fields - Fields yang ingin ditampilkan
 * @returns {Promise<Array>} - List negara yang cocok
 */
const getCountryByName = async (name, fields = 'name,capital,region,population,flags,languages,currencies') => {
  const cacheKey = `countries_name_${name}_${fields}`;
  
  // Cek cache
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    console.log(`[Cache Hit] Country search: ${name}`);
    return cachedData;
  }

  // Ambil dari API
  const response = await httpClient.get(`${BASE_URL}/name/${name}?fields=${fields}`);
  
  // Simpan ke cache
  cache.set(cacheKey, response.data);
  console.log(`[Cache Miss] Country search: ${name} - Data cached`);
  
  return response.data;
};

module.exports = {
  getAllCountries,
  getCountriesByRegion,
  getCountryByName
};