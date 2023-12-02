const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/api');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/api', routes.guest);
app.use('/api', routes.user);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});