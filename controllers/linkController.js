const crypto = require("crypto");
const Link = require("../models/Link");

const generateShortUrl = () => {
  return crypto.randomBytes(4).toString("hex");
};

const createLink = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ message: "URL is required" });
    }

    const existingLink = await Link.findOne({ originalUrl: url });

    if (existingLink) {
      return res.json({ shortUrl: existingLink.shortUrl });
    }

    let shortUrl = generateShortUrl();
    let link = await Link.findOne({ shortUrl });

    while (link) {
      shortUrl = generateShortUrl();
      link = await Link.findOne({ shortUrl });
    }

    const newLink = new Link({
      originalUrl: url,
      shortUrl,
      createdBy: req.user._id,
    });

    await newLink.save();

    res.json({ shortUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message:  "error" });
  }
};

const getLink = async (req, res) => {
  try {
    const { shortUrl } = req.params;

    const link = await Link.findOne({ shortUrl });

    if (!link) {
      return res.status(404).json({ message: "Link not found" });
    }

    link.lastAccessedAt = new Date();
    await link.save();

    res.redirect(link.originalUrl);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createLink,
  getLink,
};
