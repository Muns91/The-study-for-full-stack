import React, { useState } from 'react';
import axios from 'axios';
import { Dialog, DialogActions, DialogTitle, DialogContent, TextField, Button } from '@mui/material';
import { styled } from '@mui/system';

const HiddenInput = styled('input')({
    display: 'none',
});

function CustomerAdd({ onRefresh }) {
    const [state, setState] = useState({
        file: null,
        userName: '',
        birthday:'',
        gender:'',
        job:'',
        fileName:'',
        open: false
    });

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await addCustomer();
            console.log(result.data);
            onRefresh();
        } catch (error) {
            console.error('Error occurred while adding customer:', error);
        }
        setState({
            file:null,
            userName: '',
            birthday:'',
            gender:'',
            job:'',
            fileName:''
        })
    };

    const handleValueChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setState({ ...state, file: e.target.files[0], fileName: e.target.value });
    };

    const addCustomer = () => {
        const url = '/api/customers';
        const formData = new FormData();
        formData.append('image', state.file);
        formData.append('name', state.userName);
        formData.append('birthday', state.birthday);
        formData.append('gender', state.gender);
        formData.append('job', state.job);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        return axios.post(url, formData, config);
    };

    const handleClickOpen = () => {
        setState(prevState => ({ ...prevState, open: true }));
    }

    const handleClose= () => {
        setState({
            file:null,
            userName: '',
            birthday:'',
            gender:'',
            job:'',
            fileName:'',
            open: false
        });
    }

    return (
        <div>
            <Button variant = 'contained' color="primary" onClick={handleClickOpen}>
                고객 추가하기
            </Button>
            <Dialog open={state.open} onClose={handleClose}>
                <DialogTitle>고객 추가</DialogTitle>
                <DialogContent>
                    <HiddenInput accept="image/*" id="raised-button-file" type="file" file={state.file} value={state.fileName} onChange={handleFileChange}/>
                    <label htmlFor="raised-button-file">
                        <Button variant="contained" color="primary" component="span" name="file">
                            {state.fileName === "" ? "프로필 이미지 선택" : state.fileName}
                        </Button>
                    </label>
                    <br/>
                    <TextField label="이름" type="text" name="userName" value={state.userName} onChange={handleValueChange}/><br/>
                    <TextField label="생년월일" type="text" name="birthday" value={state.birthday} onChange={handleValueChange}/><br/>
                    <TextField label="성별" type="text" name='gender' value={state.gender} onChange={handleValueChange}/><br/>
                    <TextField label="직업" type="text" name='job' value={state.job} onChange={handleValueChange}/><br/>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={handleFormSubmit}>추가</Button>
                    <Button variant="outlined" color="primary" onClick={handleClose}>닫기</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default CustomerAdd;
