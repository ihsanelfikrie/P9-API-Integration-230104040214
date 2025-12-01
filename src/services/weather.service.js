const httpClient = require('../utils/httpClient');
const cache = require('../utils/cache');

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = process.env.OPENWEATHER_API_KEY;

/**
 * Mendapatkan data cuaca berdasarkan nama kota
 * @param {string} city - Nama kota
 * @returns {Promise<Object>} - Data cuaca
 */
const getWeatherByCity = async (city) => {
  if (!API_KEY) {
    throw new Error('OpenWeatherMap API key is not configured');
  }

  const cacheKey = `weather_${city.toLowerCase()}`;
  
  // Cek cache
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    console.log(`[Cache Hit] Weather for: ${city}`);
    return cachedData;
  }

  // Ambil dari API
  const response = await httpClient.get(BASE_URL, {
    params: {
      q: city,
      appid: API_KEY,
      units: 'metric', // Celsius
      lang: 'id' // Bahasa Indonesia
    }
  });

  // Format response
  const weatherData = {
    city: response.data.name,
    country: response.data.sys.country,
    temperature: response.data.main.temp,
    feels_like: response.data.main.feels_like,
    temp_min: response.data.main.temp_min,
    temp_max: response.data.main.temp_max,
    humidity: response.data.main.humidity,
    pressure: response.data.main.pressure,
    weather: response.data.weather[0].description,
    weather_main: response.data.weather[0].main,
    wind_speed: response.data.wind.speed,
    clouds: response.data.clouds.all,
    timestamp: new Date(response.data.dt * 1000).toISOString()
  };

  // Simpan ke cache (TTL 10 menit untuk data cuaca)
  cache.set(cacheKey, weatherData, 600);
  console.log(`[Cache Miss] Weather for: ${city} - Data cached`);
  
  return weatherData;
};

module.exports = {
  getWeatherByCity
};