const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const upload = multer({dest: './upload'});

// Customer 스키마와 모델 정의
const customerSchema = new mongoose.Schema({
    name: String,
    birthday: String,
    gender: String,
    job: String,
    image: String
});

const Customer = mongoose.model('Customer', customerSchema);

// Express 애플리케이션 생성
const app = express();
const port = process.env.PORT || 5000;

// MongoDB 연결
mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("MongoDB database connection established successfully");
});

// 미들웨어 등록
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 보안 관련 헤더 추가
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Cache-Control', 'no-store');
  next();
});

// static 미들웨어를 사용하여 'public/images' 디렉토리를 공개합니다.
app.use('/image', express.static('./upload')); // 이미지가 저장되는 디렉토리로 변경

// 라우트 정의
app.get('/api/customers', async (req, res) => { // async 키워드 추가
  try {
      const customers = await Customer.find({}); // await 키워드 사용
      res.status(200).send(customers);
  } catch (error) {
      res.status(500).send({ error: 'Failed to fetch customers.' });
  }
});


// 고객 추가 라우트 정의
app.post('/api/customers', upload.single('image'), async (req, res) => { // async 키워드 추가
  let customer = new Customer(req.body);
  customer.image = '/image/' + req.file.filename; // 이미지 파일명 설정

  try {
    const savedCustomer = await customer.save(); // await 키워드 사용
    res.status(200).send({ success: true, message: 'Customer added successfully.', savedCustomer });
  } catch (error) {
    res.status(500).send({ error: 'Failed to add customer.' });
  }
});

// 고객 삭제 라우트 정의
app.delete('/api/customers/:id', async (req, res) => { // async 키워드 추가
  try {
    await Customer.deleteOne({ _id: req.params.id }); // await 키워드 사용
    res.status(200).send({ success: true, message: 'Customer deleted successfully.' });
  } catch (error) {
    res.status(500).send({ error: 'Failed to delete customer.' });
  }
});

// 서버 시작
app.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }
  console.log(`Server is listening on ${port}`);
});
