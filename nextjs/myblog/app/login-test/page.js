'use client'
import LoginForm from '../components/LoginForm';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

export default function Test(){
    const [isLogin, setIslogin] = useState(false);

    useEffect(() => {
        if (isLogin){
            router.push("/");
        }
    }, [])

    const onSubmit = async (data) => {
        const baseUrl = "http://127.0.0.1:8000/api/auth/";
        try {
            const response = await axios.post(baseUrl, {
                email: data.id,
                password: data.pw
            },
            {
                withCredentials: true,
              },
            );
            if (response.status !== 200) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const responseData = response.data; 
            setIslogin(true);
        } catch (error) {
            alert(error.message);
        }
    };
    return(
        <LoginForm onSubmit={onSubmit}></LoginForm>
    )
}