const fs = require('fs');
const https = require('https');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const { sequelize } = require('./models/index')
const { stream } = require('./config/winston')

const app = express();
sequelize.sync();

require('dotenv').config();

const {User} = require('./models');
const uploadProfile = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/profile/')
        },
        filename: async function (req, file, cb) {
            const data = await User.create({
                user_email: String(Math.random()),
                user_password: 'temp'
            })
            cb(null, data.dataValues.id + file.originalname)
            // cb(null, file.originalname)
        }
    })
});

const projectRouter = require('./router/projectRouter');
const profileRouter = require('./router/profileRouter');
const mypageRouter = require('./router/mypageRouter');
const signinRouter = require('./router/signinRouter');
const signupRouter = require('./router/signupRouter');
const { getRecentProjects, getStackProjects } = require('./controller/landing'); 

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan('combined', {stream}));
app.use(cors({    
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'OPTIONS']
    })
);

app.use('/mypage', mypageRouter);
app.use('/signin', signinRouter);
app.use('/signup', signupRouter);
app.use('/project', projectRouter);
app.use('/profile', profileRouter);
app.get('/', getRecentProjects);
app.get('/:stack', getStackProjects);

app.post('/', uploadProfile.single('image'), (req, res) => {
    const { filename } = req.file;
    console.log(filename)
    const regex = /\d+/;
    const id = regex.exec(filename);
    console.log(id[0]);
    console.log(req.body)
    // 여기서 body 에 넣은 email, password 값으로 db 수정, path 도 추가
    // 쿼리 예시: models.Users.update({age:25},{where:{id:2}});
    // fs 같이 쓰면 어떨지 
    res.send(req.file)
    // res.send(req.files);
})

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