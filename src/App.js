import React from 'react';
import logo from './logo.svg';
import './App.css';
import Customer from './compoents/Customer';
import { Paper } from '@mui/material';
import { styled } from '@mui/system';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

const StyledPaper = styled(Paper)({
  width: '100%',
  marginTop: 16, // 이것은 theme.spacing.unit * 3을 대체합니다.
  overflowX: 'auto',
});

const StyledTable = styled(Table)({
  minWidth: 1080,
});

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

const App = () => {
  return (
    <StyledPaper>
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell>번호</TableCell>
            <TableCell>이미지</TableCell>
            <TableCell>이름</TableCell>
            <TableCell>생년월일</TableCell>
            <TableCell>성별</TableCell>
            <TableCell>직업</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
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
        </TableBody>
      </StyledTable>
    </StyledPaper>
  );
}

export default App;
