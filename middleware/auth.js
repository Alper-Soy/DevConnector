const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../models/User');

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied!' });
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    // decoded =>  {
    // user: { id: 'ghjkjlkm' },
    // iat: 1601313942,
    // exp: 1601673942 }

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid!' });
  }
};
