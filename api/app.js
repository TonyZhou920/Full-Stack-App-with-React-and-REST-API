'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { sequelize } = require('./models');
const routes = require('./routes');

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
const app = express();

// Enable All CORS Requests
app.use(cors())

// Setup request body JSON parsing.
app.use(express.json());

// setup morgan which gives us http request logging
app.use(morgan('dev'));

// authenticate db
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database successful!');
  } catch (error) {
    console.error('Error connecting to the database: ', error);
  }
})();

// api routes
app.use('/api', routes);

// setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  if (err.name === "SequelizeValidationError") {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names
    const errors = err.errors.map(error => ({[error.path] : error.message}) );
    res.status(400).json(  { "SequelizeValidationErrors": errors }  );
  } else {
    res.status(err.status || 500).json({
      message: err.message,
      error: {},
    });
  }
});

app.set('port', process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get('port'), '0.0.0.0', () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
