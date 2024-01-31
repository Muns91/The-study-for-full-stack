import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import Customer from './compoents/Customer';
import CustomerAdd from './compoents/CustomerAdd';
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

const StyledTable = styled(Table)({
  minWidth: 1080,
});

const StyledProgress = styled(CircularProgress)(({ theme }) => ({
  margin: 'auto', // Center the CircularProgress horizontally and vertically
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: theme.spacing(2), // Add top margin if needed
}));

const App = () => {
  const [customers, setCustomers] = useState();
  const [isLoading, setIsLoading] = useState();

  const callApi = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('/api/customers');
      console.log(response.data);

      const uniqueIds = new Set(response.data.map(customer => customer.id));
      if (uniqueIds.size !== response.data.length) {
        console.error('Duplicate or undefined ids found');
      }
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const stateRefresh = () => {
    setCustomers(null);
    callApi();
  };

  useEffect(() => {
    callApi();
  }, []);

  return (
    <div>
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
              <TableCell>설정</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers?.map((customer, index) => (
              <Customer stateRefresh={stateRefresh} key={customer.id} customer={customer} number={index + 1} />
            ))}
            {isLoading && (
              <TableRow>
                <TableCell colSpan={6} align='center'>
                  <StyledProgress size={40} thickness={5} />
                </TableCell>
              </TableRow>
            )}
            {!isLoading && !customers?.length && (
              <TableRow>
                <TableCell colSpan={6}>데이터가 없습니다.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </StyledTable>
      </StyledPaper>
      <CustomerAdd stateRefresh={stateRefresh}/>
    </div>
  );
};

export default App;
