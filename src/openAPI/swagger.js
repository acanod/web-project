const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Company REST API documentation',
            description: 'A Company REST API with authentication and authorization',
            version: '1.0.0',
            contact: {
                name: "alejandro.cano@opendeusto.es",
            },
        },
        servers: [
            {
                url: "http://localhost:3000/"
            }
        ]
    },
    apis: ['./src/app.js', './src/routes/*.js'], // Archivos que contienen anotaciones para swagger
    options: {
        persistAuthorization: true, // Asegurarse de que el token de autenticación persiste después de actualizar la página
    }
};

const openapiSpecification = swaggerJsDoc(swaggerOptions);

export const face = swaggerUi.serve;

export const setUpSwagger = swaggerUi.setup(openapiSpecification);