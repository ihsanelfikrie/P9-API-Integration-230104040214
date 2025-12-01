const express = require('express');
const router = express.Router();
const countriesController = require('../controllers/countries.controller');

/**
 * @route   GET /api/countries
 * @desc    Get all countries
 * @access  Public
 * @query   fields - Optional fields to include (comma-separated)
 */
router.get('/', countriesController.getAllCountries);

/**
 * @route   GET /api/countries/region/:region
 * @desc    Get countries by region
 * @access  Public
 * @param   region - Region name (asia, europe, africa, americas, oceania)
 * @query   fields - Optional fields to include (comma-separated)
 */
router.get('/region/:region', countriesController.getCountriesByRegion);

/**
 * @route   GET /api/countries/name/:name
 * @desc    Search country by name
 * @access  Public
 * @param   name - Country name
 * @query   fields - Optional fields to include (comma-separated)
 */
router.get('/name/:name', countriesController.getCountryByName);

module.exports = router;