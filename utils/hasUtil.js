const crypto = require('crypto');

const generateHash = (log) => {
  const { eventType, timestamp, sourceAppId, dataPayload, previousHash } = log;
  return crypto
    .createHash('sha256')
    .update(`${eventType}${timestamp}${sourceAppId}${JSON.stringify(dataPayload)}${previousHash || ''}`)
    .digest('hex');
};

module.exports = { generateHash };
