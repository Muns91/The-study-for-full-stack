// 사용 모듈
const express = require('express');
const bodyParser = require('body-parser');

// import cors from 'cors';

// Express 애플리케이션 생성
const app = express();
const port = process.env.PORT || 5000;

// 미들웨어 등록
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors()); // CORS 설정 추가

// 라우트 정의
app.get('/api/customers', (req, res)=>{
    res.send([{
        'id':1,
        'image':"http://placeimg.com/150/300/any",
        'name':'윤문섭',
        'birthday':'910123',
        'gender':'남자',
        'job':'대학원',
      },
      {
        'id':2,
        'image':"http://placeimg.com/640/480/any",
        'name':'홍길동',
        'birthday':'910123',
        'gender':'남자',
        'job':'프로그래머',
      },
      {
        'id':3,
        'image':"http://placeimg.com/640/480/any",
        'name':'우아',
        'birthday':'910123',
        'gender':'남자',
        'job':'디자이너',
      }]);
});

// 서버 시작
app.listen(5000, () => {
    console.log(`Listening on port 5000`);
});