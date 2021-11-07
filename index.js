"use strict";
exports.__esModule = true;
var express = require("express");
var morgan = require("morgan");
var cors = require("cors");
var cookieParser = require("cookie-parser");
var expressSession = require("express-session");
var dotenv = require("dotenv");
var passport = require("passport");
var hpp = require("hpp");
var helmet = require("helmet");
dotenv.config();
var app = express();
var prod = process.env.NODE_ENV === 'production';
// 배포용이면 포트를 자유자재로 조정, 개발용이면 3065를 사용
app.set('port', prod ? process.env.PORT : 3065);
if (prod) {
    app.use(hpp());
    app.use(helmet());
    app.use(morgan('combined'));
    app.use(cors({
        origin: /study-nodejs-typescript\.com$/,
        credentials: true
    }));
}
else {
    app.use(morgan('dev'));
    app.use(cors({
        origin: true,
        credentials: true
    }));
}
app.use('/', express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
        domain: prod ? '.study-nodejs-typescript.com' : undefined
    },
    name: 'rnbck'
}));
app.use(passport.initialize());
app.use(passport.session());
// (제로초 강사는 import 해온 모듈 관련해서는 typing을 안하고, 본인이 만든 부분은 typing을 한다고 함) -- 아마 바뀔 수 있기 때문?
app.get('/', function (req, res, next) {
    res.send('ts node 백엔드 정상 동작!');
});
app.listen(app.get('port'), function () {
    // 템플릿 리터럴 (백틱 `) : ES6부터 사용 가능 -- 개행, 표현식 삽입 가능
    console.log("server is running on " + app.get('port'));
});
