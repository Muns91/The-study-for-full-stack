import React, { useState } from 'react';
import axios from 'axios';

function CustomerAdd({ onRefresh }) {
    const [state, setState] = useState({
        file: null,
        userName: '',
        birthday:'',
        gender:'',
        job:'',
        fileName:''
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
        console.log('Sending the following data to server:', formData, config); // 추가된 코드
        return axios.post(url, formData, config);
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <h1>고객 추가</h1>
            프로필 이미지: <input type='file' name="file" file={state.file} value={state.fileName} onChange={handleFileChange}/><br/>
            이름: <input type="text" name="userName" value={state.userName} onChange={handleValueChange}/><br/>
            생년월일 : <input type="text" name="birthday" value={state.birthday} onChange={handleValueChange}/><br/>
            성별 : <input type="text" name='gender' value={state.gender} onChange={handleValueChange}/><br/>
            직업 : <input type="text" name='job' value={state.job} onChange={handleValueChange}/><br/>
            <button type="submit">추가하기</button>
        </form>
    );
}

export default CustomerAdd;
