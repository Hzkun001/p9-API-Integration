require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const openapi = require('./src/docs/openapi');

const notFound = require('./src/middleware/notfound.middleware');
const errorHandler = require('./src/middleware/error.middleware');

const countries = require('./src/routes/countries.routes');
const weather = require('./src/routes/weather.routes');

const app = express();
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/countries', countries);
app.use('/api/weather', weather);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapi));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
