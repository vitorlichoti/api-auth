const express = require('express');
const cors = require('cors');
const authRouter = require('./routes/auth.routes');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../docs/swaggerOptions');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(authRouter);

module.exports = app;