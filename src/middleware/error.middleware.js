/**
 * Global error handler middleware
 * Menangani semua error yang terjadi di aplikasi
 */
const errorHandler = (err, req, res, next) => {
  // Set status code
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  // Log error untuk debugging
  console.error('[Error Handler]', {
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method
  });

  // Response error dalam format JSON
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    error: {
      status: statusCode,
      timestamp: new Date().toISOString(),
      path: req.originalUrl,
      method: req.method
    },
    // Tampilkan stack trace hanya di development
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = errorHandler;