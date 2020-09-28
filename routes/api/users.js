const express = require('express');
const router = express.Router();

// @route   POST api/users
// @desc    Register route
// @access  Public
router.get('/', (req, res) => {
  console.log(res.body);
  res.send('User route');
});

module.exports = router;
