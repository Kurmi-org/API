import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de autenticación',
            version: '1.0.0',
            description: 'API para autenticación de usuarios'
        },
        servers: [
            {
                url: 'http://localhost:3001',
                description: 'Servidor de desarrollo'
            }
        ],
        components: {
            schemas: {},
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
        additionalSchemas: [
            './src/schemas/client.schema.js',
            './src/schemas/error.schema.js'

        ]
    },
    apis:[
        './src/routes/*.js'

    ]
};

const specs = swaggerJSDoc(options);

export default (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};