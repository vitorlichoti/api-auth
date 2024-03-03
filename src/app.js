const express = require('express');
const cors = require('cors');
const authRouter = require('./routes/auth.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use(authRouter);

module.exports = app;