"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import axios from "axios";
import Route from "react";

const LoginForm = ({onSubmit}) => {
    const { register, handleSubmit } = useForm();
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
