const express = require('express');
const bodyParser = require('body-parser');
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const loggingMiddleware = require('./middlewares/logging');
const errorHandlingMiddleware = require('./middlewares/errorHandling');
const authMiddleware = require('./middlewares/authMiddleware');
const logger = require('./utils/logging');
const options = require('./utils/swagger');
const testController = require('./controllers/test/testController');

const app = express();

app.use(bodyParser.json());

const specs = swaggerJsdoc(options);
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
);

app.all('*', loggingMiddleware);

//auth
app.use(authMiddleware());

app.use('/api/test', testController);

//handling 404
app.use((request, response, next) => {
    next({ statusCode: 404 });
});



//error handling
app.use(errorHandlingMiddleware);

const server = app.listen(8888, () => {
    const { port, address } = server.address();
    logger.info(`start running at ${address}:${port}`);
});

process.on('unhandledException', err => {
    logger.error(`Unhandled Exception: ${err}`);
});
process.on('unhandledRejection', (err, promise) => {
    logger.error(`Unhandled Rejection: ${err}`);
});

