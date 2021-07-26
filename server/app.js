const fs = require('fs');
const https = require('https');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require('express');
const morgan = require('morgan');
const { sequelize } = require('./models/index');
const { stream } = require('./config/winston');

const app = express();
sequelize.sync();

require('dotenv').config();

const landingRouter = require('./router/landingRouter');
const projectRouter = require('./router/projectRouter');
const profileRouter = require('./router/profileRouter');
const mypageRouter = require('./router/mypageRouter');
const signinRouter = require('./router/signinRouter');
const signupRouter = require('./router/signupRouter');
const imageRouter = require('./router/imageRouter');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan('combined', { stream }));
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'OPTIONS'],
  })
);

app.use('/', landingRouter);
app.use('/mypage', mypageRouter);
app.use('/signin', signinRouter);
app.use('/signup', signupRouter);
app.use('/project', projectRouter);
app.use('/profile', profileRouter);
app.use('/image', imageRouter);

const HTTPS_PORT = process.env.HTTPS_PORT || 80;

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
