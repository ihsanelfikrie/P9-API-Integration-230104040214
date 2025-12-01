require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');

// Import routes
const countriesRoutes = require('./src/routes/countries.routes');
const weatherRoutes = require('./src/routes/weather.routes');

// Import middleware
const notFound = require('./src/middleware/notfound.middleware');
const errorHandler = require('./src/middleware/error.middleware');

// Import swagger docs
const swaggerDocs = require('./src/docs/openapi');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev')); // HTTP request logger

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to API Integration - REST Countries & Weather',
    author: 'Muhammad Nur Ihsan - 230104040214',
    endpoints: {
      countries: '/api/countries',
      weather: '/api/weather',
      docs: '/docs'
    },
    documentation: 'http://localhost:3000/docs'
  });
});

// API Routes
app.use('/api/countries', countriesRoutes);
app.use('/api/weather', weatherRoutes);

// Swagger Documentation
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, {
  customSiteTitle: 'API Documentation - P9 WSE',
  customCss: '.swagger-ui .topbar { display: none }'
}));

// 404 Handler - must be after all routes
app.use(notFound);

// Error Handler - must be last
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📍 API Base URL: http://localhost:${PORT}`);
  console.log(`📚 API Documentation: http://localhost:${PORT}/docs`);
  console.log(`👤 Developer: Muhammad Nur Ihsan (230104040214)`);
  console.log('='.repeat(50));
  console.log('\n📋 Available Endpoints:');
  console.log(`   GET  /api/countries`);
  console.log(`   GET  /api/countries/region/:region`);
  console.log(`   GET  /api/countries/name/:name`);
  console.log(`   GET  /api/weather?city=<city_name>`);
  console.log('\n💡 Tips:');
  console.log('   - Use Postman or browser to test endpoints');
  console.log('   - Check /docs for interactive API documentation');
  console.log('   - Press Ctrl+C to stop the server\n');
});