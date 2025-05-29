const successResponse = (res, { message, data = null, status = 200 }) => {
  return res.status(status).json({
    success: true,
    message,
    data,
    timestamp: new Date().toISOString()
  });
};

const errorResponse = (res, { message, error = null, status = 400 }) => {
  return res.status(status).json({
    success: false,
    message,
    error,
    timestamp: new Date().toISOString()
  });
};

module.exports = {
  successResponse,
  errorResponse
};