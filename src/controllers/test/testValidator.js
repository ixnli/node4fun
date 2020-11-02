const { body } = require('express-validator');
const validate = require('../../middlewares/validationMiddleware');

module.exports = validate(
    [
        body('firstName').notEmpty(),
        body('lastName').notEmpty()
    ]
);
