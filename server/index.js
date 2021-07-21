require('dotenv').config();
// const {stream} = require('./configs/winston')
const fs = require('fs');
const https = require('https');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan('combined'));

const corsOptions = {    
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'OPTIONS']
};
app.use(cors());

app.get('/', (req, res) => {
    console.log(req.cookies)
    res.json({msg: "hello world!"})
})


const HTTPS_PORT = process.env.HTTPS_PORT || 4001;
let server;

if (fs.existsSync('./key.pem') && fs.existsSync('./cert.pem')) {
    const privateKey = fs.readFileSync(__dirname + '/key.pem', 'utf8');
    const certificate = fs.readFileSync(__dirname + '/cert.pem', 'utf8');
    const credentials = { key: privateKey, cert: certificate };

    server = https.createServer(credentials, app);
    server.listen(HTTPS_PORT, () => console.log('https server success'));
} else {
    server = app.listen(HTTPS_PORT, () => console.log('http server success'));
}