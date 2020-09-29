const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../../middleware/auth');

const postController = require('../../controllers/post');

// @route    POST api/posts
// @desc     Create a post
// @access   Private
router.post(
  '/',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  postController.postCreatePost
);

// @route    GET api/posts
// @desc     Get all posts
// @access   Private
router.get('/', auth, postController.getPosts);

// @route    GET api/posts/:id
// @desc     Get post by ID
// @access   Private
router.get('/:id', auth, postController.getPost);

// @route    DELETE api/posts/:id
// @desc     Delete a post
// @access   Private
router.delete('/:id', auth, postController.deletePost);

module.exports = router;
