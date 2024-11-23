const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const logRoutes = require('./routes//logRoutes');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();
connectDB();

const app = express();
app.use(bodyParser.json());

app.use('/api/logs', logRoutes);

app.use(errorHandler);

module.exports = app;
