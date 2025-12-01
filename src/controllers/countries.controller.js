const countriesService = require('../services/countries.service');

/**
 * Controller untuk mendapatkan semua negara
 */
const getAllCountries = async (req, res, next) => {
  try {
    const fields = req.query.fields || 'name,capital,region,population,flags';
    const countries = await countriesService.getAllCountries(fields);
    
    res.status(200).json({
      success: true,
      count: countries.length,
      data: countries
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller untuk mendapatkan negara berdasarkan region
 */
const getCountriesByRegion = async (req, res, next) => {
  try {
    const { region } = req.params;
    const fields = req.query.fields || 'name,capital,region,population,flags';
    
    if (!region) {
      return res.status(400).json({
        success: false,
        message: 'Region parameter is required'
      });
    }

    const countries = await countriesService.getCountriesByRegion(region, fields);
    
    res.status(200).json({
      success: true,
      region: region,
      count: countries.length,
      data: countries
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller untuk mencari negara berdasarkan nama
 */
const getCountryByName = async (req, res, next) => {
  try {
    const { name } = req.params;
    const fields = req.query.fields || 'name,capital,region,population,flags,languages,currencies';
    
    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Country name parameter is required'
      });
    }

    const countries = await countriesService.getCountryByName(name, fields);
    
    res.status(200).json({
      success: true,
      count: countries.length,
      data: countries
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCountries,
  getCountriesByRegion,
  getCountryByName
};