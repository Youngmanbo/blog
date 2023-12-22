"use client";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import axios from "axios";
import Route from "react";

const LoginForm = () => {
    const { register, handleSubmit } = useForm();
    const router = useRouter();
    const onSubmit = async (data) => {
        const baseUrl = "https://api.ymlog/api/auth/";
        const baseLocalUrl = "http://localhost:8000/api/auth/";
        try {
            const response = await axios.post(baseLocalUrl, {
                email: data.id,
                password: data.pw
            },
            );
            if (response.status !== 200) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const responseData = response.data; 
            router.push("/");
        } catch (error) {
            alert(error.message);
        }
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>로그인</h1>
            <div>
                <input {...register("id")} type='email' placeholder="이메일을 입력해주세요" required />
            </div>
            <div>
                <input {...register("pw")} type='password' placeholder="비밀번호를 입력해주세요" required />
            </div>
            <input type='submit' />
        </form>
    );
};

export default LoginForm;
