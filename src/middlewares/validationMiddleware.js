const { validationResult } = require('express-validator');

module.exports = validations => {
    return async (request, response, next) => {
        await Promise.all(validations.map(validation => validation.run(request)));

        const errors = validationResult(request);
        if (errors.isEmpty()) {
            return next();
        }
        return next({ statusCode: 400, errors: errors.array() });
    };
};
