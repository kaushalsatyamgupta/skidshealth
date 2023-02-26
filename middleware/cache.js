const express = require('express');
const router = express.Router();

// Import  link model
const Link = require('../models/Link');

// Add middleware to validate the request body
router.use((req, res, next) => {
  if (!req.body.url || !req.body.shortUrl) {
    return res.status(400).json({ message: 'url and shortUrl are required' });
  }
  next();
});

// // Create a new link
// router.post('/', async (req, res) => {
//   try {
//     const link = new Link({
//       url: req.body.url,
//       shortUrl: req.body.shortUrl
//     });
//     const savedLink = await link.save();
//     res.json(savedLink);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// Create a new link
router.post('/', async (req, res) => {
  try {
    console.log('Received URL:', req.body.url);
    console.log('Received shortUrl:', req.body.shortUrl);
    const link = new Link({
      url: req.body.url,
      shortUrl: req.body.shortUrl
    });
    const savedLink = await link.save();
    res.json(savedLink);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
