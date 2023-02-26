const express = require('express');
const router = express.Router();
const Link = require('../models/Link');

router.post('/api/links/shorten', async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ message: 'URL is required' });
  }

  try {
    let link = await Link.findOne({ originalUrl: url });
    if (link) {
      return res.json(link);
    }

    const code = generateCode();
    link = new Link({ originalUrl: url, code });
    await link.save();

    return res.json(link);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
