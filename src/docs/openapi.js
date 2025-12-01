/**
 * OpenAPI (Swagger) Documentation
 * Dokumentasi API untuk semua endpoint
 */
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Integration - REST Countries & Weather',
    version: '1.0.0',
    description: 'API untuk integrasi REST Countries dan OpenWeatherMap - Praktikum WSE #9',
    contact: {
      name: 'Muhammad Nur Ihsan',
      email: '230104040214@mhs.ulm.ac.id'
    }
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server'
    }
  ],
  tags: [
    {
      name: 'Countries',
      description: 'Endpoint untuk data negara dari REST Countries API'
    },
    {
      name: 'Weather',
      description: 'Endpoint untuk data cuaca dari OpenWeatherMap API'
    }
  ],
  paths: {
    '/api/countries': {
      get: {
        tags: ['Countries'],
        summary: 'Get all countries',
        description: 'Mendapatkan semua negara dengan fields yang dapat dikustomisasi',
        parameters: [
          {
            name: 'fields',
            in: 'query',
            description: 'Fields yang ingin ditampilkan (comma-separated)',
            required: false,
            schema: {
              type: 'string',
              default: 'name,capital,region,population,flags',
              example: 'name,capital,region,population'
            }
          }
        ],
        responses: {
          200: {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    count: { type: 'number', example: 250 },
                    data: {
                      type: 'array',
                      items: { type: 'object' }
                    }
                  }
                }
              }
            }
          },
          500: {
            description: 'Server error'
          }
        }
      }
    },
    '/api/countries/region/{region}': {
      get: {
        tags: ['Countries'],
        summary: 'Get countries by region',
        description: 'Mendapatkan negara berdasarkan region tertentu',
        parameters: [
          {
            name: 'region',
            in: 'path',
            description: 'Nama region (asia, europe, africa, americas, oceania)',
            required: true,
            schema: {
              type: 'string',
              enum: ['asia', 'europe', 'africa', 'americas', 'oceania'],
              example: 'asia'
            }
          },
          {
            name: 'fields',
            in: 'query',
            description: 'Fields yang ingin ditampilkan (comma-separated)',
            required: false,
            schema: {
              type: 'string',
              default: 'name,capital,region,population,flags'
            }
          }
        ],
        responses: {
          200: {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    region: { type: 'string', example: 'asia' },
                    count: { type: 'number', example: 50 },
                    data: {
                      type: 'array',
                      items: { type: 'object' }
                    }
                  }
                }
              }
            }
          },
          400: {
            description: 'Bad request - region parameter required'
          },
          500: {
            description: 'Server error'
          }
        }
      }
    },
    '/api/countries/name/{name}': {
      get: {
        tags: ['Countries'],
        summary: 'Search country by name',
        description: 'Mencari negara berdasarkan nama',
        parameters: [
          {
            name: 'name',
            in: 'path',
            description: 'Nama negara yang dicari',
            required: true,
            schema: {
              type: 'string',
              example: 'indonesia'
            }
          },
          {
            name: 'fields',
            in: 'query',
            description: 'Fields yang ingin ditampilkan (comma-separated)',
            required: false,
            schema: {
              type: 'string',
              default: 'name,capital,region,population,flags,languages,currencies'
            }
          }
        ],
        responses: {
          200: {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    count: { type: 'number', example: 1 },
                    data: {
                      type: 'array',
                      items: { type: 'object' }
                    }
                  }
                }
              }
            }
          },
          400: {
            description: 'Bad request - name parameter required'
          },
          404: {
            description: 'Country not found'
          },
          500: {
            description: 'Server error'
          }
        }
      }
    },
    '/api/weather': {
      get: {
        tags: ['Weather'],
        summary: 'Get weather by city',
        description: 'Mendapatkan data cuaca berdasarkan nama kota',
        parameters: [
          {
            name: 'city',
            in: 'query',
            description: 'Nama kota',
            required: true,
            schema: {
              type: 'string',
              example: 'Palangkaraya'
            }
          }
        ],
        responses: {
          200: {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    data: {
                      type: 'object',
                      properties: {
                        city: { type: 'string', example: 'Palangkaraya' },
                        country: { type: 'string', example: 'ID' },
                        temperature: { type: 'number', example: 28.5 },
                        feels_like: { type: 'number', example: 32.1 },
                        temp_min: { type: 'number', example: 27.0 },
                        temp_max: { type: 'number', example: 30.0 },
                        humidity: { type: 'number', example: 75 },
                        pressure: { type: 'number', example: 1012 },
                        weather: { type: 'string', example: 'langit cerah' },
                        weather_main: { type: 'string', example: 'Clear' },
                        wind_speed: { type: 'number', example: 3.5 },
                        clouds: { type: 'number', example: 20 },
                        timestamp: { type: 'string', example: '2024-01-15T08:30:00.000Z' }
                      }
                    }
                  }
                }
              }
            }
          },
          400: {
            description: 'Bad request - city parameter required'
          },
          404: {
            description: 'City not found'
          },
          500: {
            description: 'Server error'
          }
        }
      }
    }
  }
};

module.exports = swaggerDefinition;