const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Auth API Documentation',
      version: '1.0.0',
      description: 'This document describes the routes and functionalities of the authentication API for the product management backend.',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        url: 'https://api-auth-pi.vercel.app/api/auth',
      },
    ],
  },
  apis: ['src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;