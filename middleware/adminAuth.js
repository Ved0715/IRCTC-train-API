



adminAuth = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if (apiKey === process.env.ADMIN_API_KEY) return next();
    res.status(403).json({ 
        success: false,
        message: 'Unauthorized'
    });
  };

module.exports = adminAuth;