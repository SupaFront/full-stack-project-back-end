const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const options = require('./swagger.json');

require('dotenv').config();

const { questionsRouter, usersRouter } = require('./routes/api');

const app = express();
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(options));

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/auth', usersRouter);
app.use('/api/tests', questionsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server Error' } = err;
  res.status(status).json({ message });
});

module.exports = app;
