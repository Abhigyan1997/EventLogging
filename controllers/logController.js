const { createLog, getLogs } = require('../services/logServices');
const Joi = require('joi');

const logSchema = Joi.object({
  eventType: Joi.string().required(),
  timestamp: Joi.date().required(),
  sourceAppId: Joi.string().required(),
  dataPayload: Joi.object().required(),
});

const createLogHandler = async (req, res, next) => {
  try {
    const { error } = logSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const log = await createLog(req.body);
    res.status(201).json({ message: 'Log created successfully', log });
  } catch (error) {
    next(error);
  }
};

const getLogsHandler = async (req, res, next) => {
  try {
    const { from, to, eventType, sourceAppId, page = 1, limit = 10 } = req.query;
    const filters = {
      ...(from && to && { timestamp: { $gte: new Date(from), $lte: new Date(to) } }),
      ...(eventType && { eventType }),
      ...(sourceAppId && { sourceAppId }),
    };

    const pagination = { skip: (page - 1) * limit, limit: parseInt(limit, 10) };
    const { logs, totalCount } = await getLogs(filters, pagination);
    res.status(200).json({ logs, totalCount });
  } catch (error) {
    next(error);
  }
};

module.exports = { createLogHandler, getLogsHandler };
