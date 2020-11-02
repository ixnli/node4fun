const express = require('express');
const router = express.Router();
const validator = require('./testValidator');
const authorizer = require('./testAuthorizer');

router.get('/', authorizer, (request, response, next) => {
    response.json({ message: 'hello world', code: 123 });
});

router.post('/', validator, authorizer, (request, response, next) => {
    const { firstName, lastName } = request.body;
    const result = {
        firstName,
        lastName
    };

    response.json(result);
});


module.exports = router;