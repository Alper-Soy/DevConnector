const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const userController = require('../../controllers/user');

// @route   POST api/users
// @desc    Register route
// @access  Public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  userController.postRegister
);

module.exports = router;
