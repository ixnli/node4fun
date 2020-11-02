const logger = require("../utils/logging");

module.exports = (error, request, response, next) => {
    logger.error(`error occurred: ${JSON.stringify(error)}`);
    if (error.statusCode === 400)
        return response.status(400).json({ message: "400 error", errors: error.errors });
    if (error.statusCode === 404)
        return response.status(404).json({ message: "404 error" });
    if (error.statusCode === 401 || error.status === 401)
        return response.status(401).json({ message: "401 error" });
    if (error.statusCode === 403)
        return response.status(403).json({ message: "403 error" });

    return response.status(500).json({ message: error.message })
};