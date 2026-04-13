function requireFields(fields) {
  return (req, res, next) => {
    const missing = fields.filter((f) => !req.body[f] && req.body[f] !== 0);
    if (missing.length > 0) {
      return res.status(400).json({
        success: false,
        error: `Missing required fields: ${missing.join(', ')}`,
      });
    }
    next();
  };
}

function requireQuery(fields) {
  return (req, res, next) => {
    const missing = fields.filter((f) => !req.query[f]);
    if (missing.length > 0) {
      return res.status(400).json({
        success: false,
        error: `Missing required query params: ${missing.join(', ')}`,
      });
    }
    next();
  };
}

module.exports = { requireFields, requireQuery };
