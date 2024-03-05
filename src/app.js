const express = require('express');
const cors = require('cors');
const authRouter = require('./routes/auth.routes');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../docs/swaggerOptions');

const CSS = "https://cdn.bootcdn.net/ajax/libs/swagger-ui/5.6.2/swagger-ui.min.css"

const app = express();

app.use(cors());
app.use(express.json());

app.use(authRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { customCss: CSS }));


module.exports = app;