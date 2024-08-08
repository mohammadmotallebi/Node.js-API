const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/api');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override')
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8050;

function logErrors(err, req, res, next) {
    console.error(err.stack)
    next(err)
}

function clientErrorHandler(err, req, res, next) {
    if (req.xhr) {
        res.status(500).json({error: 'Something failed!'})
    } else {
        next(err)
    }
}

function errorHandler(err, req, res, next) {
    res.status(500)
    res.render('error', {error: err})
}

//a function to check loading state this function should wait for complete state
async function loading(){
    // await console.log('Echeck Element =>>>>>',$(document)[0].readyState)
    while ($(document)[0].readyState !== 'complete') {
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    console.log('State =>',$(document)[0].readyState)
    return true;
}

loading().then((res) => {
    console.log('Loading State =>',res)
})



app.use(methodOverride('_method'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(logErrors)
app.use(clientErrorHandler)
app.use(errorHandler)

app.use(cors({
    origin: 'http://localhost:5174',
    credentials: true
}));
app.use('/api', routes.guest);
app.use('/api', routes.user);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});