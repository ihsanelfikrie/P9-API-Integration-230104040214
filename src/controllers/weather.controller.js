const weatherService = require('../services/weather.service');

/**
 * Controller untuk mendapatkan cuaca berdasarkan kota
 */
const getWeatherByCity = async (req, res, next) => {
  try {
    const { city } = req.query;
    
    if (!city) {
      return res.status(400).json({
        success: false,
        message: 'City query parameter is required'
      });
    }

    const weather = await weatherService.getWeatherByCity(city);
    
    res.status(200).json({
      success: true,
      data: weather
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getWeatherByCity
};