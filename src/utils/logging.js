const winston = require('winston');
const { format, transports } = winston;

const logFormat = format.printf(info => `${info.timestamp} ${info.level} ${info.message}`);

const options = {
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.prettyPrint()
    ),
    transports: [
        new transports.Console({
            format: format.combine(format.colorize(), logFormat),
        })
    ],
    exitOnError: false,
};

const logger = winston.createLogger(options);

if (process.env.NODE_ENV !== 'production') {
    logger.debug('Logging initialized at debug level');
}

module.exports = logger;