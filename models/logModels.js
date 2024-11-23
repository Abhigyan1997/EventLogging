const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  eventType: { type: String, required: true },
  timestamp: { type: Date, required: true },
  sourceAppId: { type: String, required: true },
  dataPayload: { type: Object, required: true },
  previousHash: { type: String, required: false },
  currentHash: { type: String, required: true },
});

module.exports = mongoose.model('Log', logSchema);
