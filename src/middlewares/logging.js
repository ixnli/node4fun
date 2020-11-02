
const logger = require('../utils/logging');

module.exports = (request, response, next) => {
    logger.info(`incoming request ${JSON.stringify(request.body)}`);

    const prevWrite = response.write,
        prevEnd = response.end,
        chunks = [];

    response.write = function (chunk) {
        chunks.push(chunk);
        return prevWrite.apply(response, arguments);
    }

    response.end = function (chunk) {
        if (chunk)
            chunks.push(chunk);

        const body = Buffer.concat(chunks).toString('utf8');
        logger.info(`outgoing response ${body}`);
        prevEnd.apply(response, arguments);
    }

    next();
};