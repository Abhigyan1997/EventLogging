const Log = require('../models/logModels');
const { generateHash } = require('../utils/hasUtil');

const createLog = async (logDatas) => {
  const lastLog = await Log.findOne().sort({ _id: -1 });
  const previousHash = lastLog ? lastLog.currentHash : null;

  const newLog = {
    ...logDatas,
    previousHash,
    currentHash: generateHash({ ...logData, previousHash }),
  };

  const log = new Log(newLog);
  await log.save();
  return log;
};

const getLogs = async (filters, pagination) => {
  const { skip, limit } = pagination;
  const logs = await Log.find(filters).sort({ timestamp: -1 }).skip(skip).limit(limit);
  const totalCount = await Log.countDocuments(filters);
  return { logs, totalCount };
  console.log(logs)
};


module.exports = { createLog, getLogs };
