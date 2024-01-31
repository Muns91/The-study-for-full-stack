import React from "react";
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import CustomerDelete from "./CustomerDelete";

function Customer({ customer, number, stateRefresh }) {
    if (!customer) {
        return null; // 또는 대체할 컴포넌트나 메시지
    }

    return (
        <TableRow>
            <TableCell>{number}</TableCell> {/* _id를 사용 */}
            <TableCell><img src={`http://localhost:5000${customer.image}`} alt='profile' style={{ width: '64px' }}/></TableCell>
            <TableCell>{customer.name}</TableCell>
            <TableCell>{customer.birthday}</TableCell>
            <TableCell>{customer.gender}</TableCell>
            <TableCell>{customer.job}</TableCell>
            <TableCell><CustomerDelete onRefresh={stateRefresh} id={customer._id}/></TableCell>
        </TableRow>
    );
}

export default Customer;
