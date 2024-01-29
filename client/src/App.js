import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Customer from 'C:/Users/2022-PC(T)-27/Desktop/SKT FLY AI 4기/Study/mini_project_na/management/client/src/compoents/Customer';
import { Paper, CircularProgress } from '@mui/material'; 
import { styled } from '@mui/system';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

const StyledPaper = styled(Paper)({
  width: '100%',
  marginTop: 16,
  overflowX: 'auto',
});

const StyledTable = styled(Table)(({ theme }) => ({
  minWidth: 1080,
  progress: {
    margin: 'auto', // Center the CircularProgress horizontally and vertically
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing(2), // Add top margin if needed
  },
}));

const App = () => {
  const [customers, setCustomers] = useState([]);
  const [completed, setCompleted] = useState(0);
  let timer;

  useEffect(() => {
    const callApi = async () => {
      try {
        const response = await fetch('/api/customers');
        const data = await response.json();
        setCustomers(data);
        setCompleted(1); // Set completed to 1 when data fetching is complete
      } catch (error) {
        console.error('Error fetching data:', error);
        setCompleted(-1); // Set completed to -1 in case of an error
      }
    };

    const progress = () => {
      setCompleted((prevCompleted) => (prevCompleted >= 100 ? 0 : prevCompleted + 1));
    };

    timer = setInterval(progress, 10);
    callApi();

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(timer);
    };
  }, []);

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
          {customers.map((c) => (
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
          {customers.length === 0 && (
            <TableRow>
              <TableCell colSpan={6}>데이터가 없습니다.</TableCell>
              <TableCell colSpan={6} align='center'>
              <CircularProgress
                    className={StyledTable.progress}
                    variant="determinate"
                    value={completed}
                    size={40} // 크기 조절
                    thickness={5} // 두께 조절
                  />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </StyledTable>
    </StyledPaper>
  );
};

export default App;
