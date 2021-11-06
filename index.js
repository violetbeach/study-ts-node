"use strict";
exports.__esModule = true;
var express = require("express");
var app = express();
var prod = process.env.NODE_ENV === 'production';
// 배포용이면 포트를 자유자재로 조정, 개발용이면 3065를 사용
app.set('port', prod ? process.env.PORT : 3065);
// (제로초 강사는 import 해온 모듈 관련해서는 typing을 안하고, 본인이 만든 부분은 typing을 한다고 함) -- 아마 바뀔 수 있기 때문?
app.get('/', function (req, res, next) {
    res.send('ts node 백엔드 정상 동작!');
});
app.listen(app.get('port'), function () {
    // 템플릿 리터럴 (백틱 `) : ES6부터 사용 가능 -- 개행, 표현식 삽입 가능
    console.log("server is running on " + app.get('port'));
});
