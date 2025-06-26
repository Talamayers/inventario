function errorHandler(err, req, res, next) {
  console.error('💥 Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor'
  });
}

module.exports = errorHandler;
