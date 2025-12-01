const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weather.controller');

/**
 * @route   GET /api/weather
 * @desc    Get weather by city name
 * @access  Public
 * @query   city - City name (required)
 */
router.get('/', weatherController.getWeatherByCity);

module.exports = router;