module.exports = (request, response, next) => {
    const { firstName } = request.body;
    const isAuthorized = firstName !== '34';
    if (isAuthorized)
        return next();

    return next({ statusCode: 403 });
};