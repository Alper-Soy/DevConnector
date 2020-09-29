const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const profileController = require('../../controllers/profile');

// @route   GET api/profile/me
// @desc    Get current user profile
// @access  Private
router.get('/me', auth, profileController.getCurrentUserProfile);

module.exports = router;
