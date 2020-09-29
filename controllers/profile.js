const { validationResult } = require('express-validator');

const Profile = require('../models/Profile');
const User = require('../models/User');

exports.getCurrentUserProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error!');
  }
};

exports.postCreateProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    company,
    location,
    website,
    bio,
    skills,
    status,
    githubusername,
    youtube,
    twitter,
    instagram,
    linkedin,
    facebook,
  } = req.body;

  const profileFields = {
    user: req.user.id,
    company: company ? company : '',
    website: website ? website : '',
    location: location ? location : '',
    bio: bio ? bio : '',
    status: status ? status : '',
    githubusername: githubusername ? githubusername : '',
    skills,
    social: {
      youtube: youtube ? youtube : '',
      twitter: twitter ? twitter : '',
      instagram: instagram ? instagram : '',
      linkedin: linkedin ? linkedin : '',
      facebook: facebook ? facebook : '',
    },
  };

  try {
    let profile = await Profile.findOne({ user: req.user.id });

    // Using upsert option (creates new doc if no match is found):
    // Update or Create
    profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: profileFields },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error!');
  }
};

exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error!');
  }
};

exports.getProfileByUserId = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) return res.status(400).json({ msg: 'Profile not found!' });

    res.json(profile);
  } catch (err) {
    console.error(err);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found!' });
    }
    res.status(500).send('Server Error!');
  }
};
