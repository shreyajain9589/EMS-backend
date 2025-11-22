// ---------------------------------------------
// NOT FOUND MIDDLEWARE
// Called when no route matches
// ---------------------------------------------
export const notFound = (req, res, next) => {
  const message = `Not Found - ${req.originalUrl}`;
  res.status(404).json({ message });
};

// ---------------------------------------------
// GLOBAL ERROR HANDLER
// Catches all thrown errors
// ---------------------------------------------
export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode && res.statusCode !== 200
    ? res.statusCode
    : 500;

  res.status(statusCode).json({
    message: err.message || "Server Error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};
