import logo from './logo.svg';
import './App.css';
import Customer from './compoents/Customer';


const customers = [{
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
}]

function App() {
  return (
    <div>
      {customers.map(c => (
        <Customer
          key={c.id}
          id={c.id}
          image={c.image}
          name={c.name}
          birthday={c.birthday}
          gender={c.gender}
          job={c.job}
        />
      ))}
    </div>
  );
}


export default App;
