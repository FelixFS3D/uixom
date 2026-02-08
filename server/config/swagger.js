const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Uixom API',
      version: '1.0.0',
      description: 'API para la gestión de solicitudes de servicios web, aplicaciones y soluciones de software e IA.',
      contact: {
        name: 'Equipo Uixom',
        url: 'https://github.com/FelixFS3D/uixom',
      },
    },
    servers: [
      {
        url: 'http://localhost:5005',
        description: 'Development server',
      },
    ],
  },
  apis: ['./routes/*.js', './models/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
