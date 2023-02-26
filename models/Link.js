const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
  url: { type: String, required: false },
  shortUrl: { type: String, required: false },
  createdAt: { type: Date, default: Date.now, expires: '30d' },
  clickCount: { type: Number, default: 0 },
});

// Add pre-save hook to generate shortUrl if not provided
// linkSchema.pre('save', function (next) {
//   if (!this.shortUrl) {
//     this.shortUrl = Math.random().toString(36).substr(2, 5);
//   }
//   next();
// });

module.exports = mongoose.model('Link', linkSchema);
