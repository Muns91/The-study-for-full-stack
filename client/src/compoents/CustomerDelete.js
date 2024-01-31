import React, { useState, useCallback } from 'react';
import { Dialog, DialogActions, DialogTitle, DialogContent, Button, Typography } from '@mui/material';

function CustomerDelete({ id, onRefresh }) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const deleteCustomer = useCallback(async () => {
        const url = '/api/customers/' + id;
        await fetch(url, {
            method: 'DELETE'
        });
        onRefresh();
        handleClose();
    }, [id, onRefresh]);

    return (
        <div>
            <Button variant="contained" color="secondary" onClick={handleClickOpen}>삭제</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle onClose={handleClose}> 
                    삭제 경고
                </DialogTitle>
                <DialogContent>
                    <Typography gutterBottom>
                        선택한 고객 정보가 삭제됩니다.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' color='primary' onClick={deleteCustomer}>삭제</Button>
                    <Button variant='outlined' color='primary' onClick={handleClose}>닫기</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default CustomerDelete;
