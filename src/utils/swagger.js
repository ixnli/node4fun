
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Express API with Swagger",
            version: "0.1.0",
            description:
                "This is a simple CRUD API application made with Express and documented with Swagger",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
                name: "test",
                url: "",
                email: "info@email.com",
            },
        },
        servers: [
            {
                url: "http://localhost:8888/api/test",
            },
        ],
        components: {
            schemas: {
                test: {
                    "type": "object",
                    "properties": {
                        "firstName": { type: "string" },
                        "lastName": { type: "string" }
                    }
                }
            }
        },
        paths: {
            "/api/test": {
                get: {
                    description: "get test object",
                    responses: {
                        "200": {
                            content: {
                                "application/json": {
                                    "schema": {
                                        "type": "object",
                                        "items": {
                                            "$ref": "#/components/schemas/test"
                                        }
                                    }
                                }
                            }
                        }
                    }
                },

            }

        }
    },
    apis: []
};

module.exports = options;