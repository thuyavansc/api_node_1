const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0", // Specification (3.0.0)
    info: {
      title: "Your API Title",
      version: "1.0.0",
      description: "Description of your API",
    },
    basePath: "/api", // Base path to your API
  },
  apis: ["./app.js"], // Your main application file
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
