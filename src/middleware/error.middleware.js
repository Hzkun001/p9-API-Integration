// src/middleware/error.middleware.js
module.exports = (err, req, res, next) => {
  const status = err.status || 500;
  const detail = err.response?.data || err.message || 'Unknown error';

  res.status(status).json({ message: 'Error', detail });
};
