const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const helmet     = require('helmet');
const morgan     = require('morgan');

const port = process.env.API_PORT;

const enableCORS = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, X-Access-Token');
    if ('OPTIONS' == req.method) return res.sendStatus(200);
    next();
};
app.use(enableCORS);
app.use(helmet());

app.use(bodyParser.urlencoded({ extended: true, limit: '16mb' }));
app.use(bodyParser.json({ limit: '16mb' }));
app.use(morgan('dev'));

app.use('/api', require('./routes/public'));

app.listen(port);

console.log(`echoAtTime API is listening on port: ${port}`);