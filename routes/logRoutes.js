const express = require('express');
const { createLogHandler, getLogsHandler } = require('../controllers/logController');
const router = express.Router();

router.post('/', createLogHandler);
router.get('/', getLogsHandler);

module.exports = router;
