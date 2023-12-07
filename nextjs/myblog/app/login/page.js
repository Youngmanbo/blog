'use client'
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import axios from 'axios';

export default function Login(){
    const {register, handleSubmit, watch, formState:{ errors }} = useForm()
    const onSubmit = (data) =>{
        console.log(data.id);
        const login = async (data) => {
            try {
                const url = 'http://127.0.0.1:8000/api/auth/';
                const response = await fetch(url, {
                    method: 'POST',
                    headers :{
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: data.id,
                        password: data.pw,
                    })
              });

              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
              const responseData = await response.json();
              console.log(responseData);
              return <Navigate to="/" />
            } catch (error) {
              alert(error.message);
            }
          };
          
        login(data);
    }
    return(
        <main>
            <form onSubmit={handleSubmit(onSubmit)}>
                    <h1>로그인</h1>
                    <div>
                        <input {...register("id")} type='email' placeholder="이메일을 입력해주세요" required></input>
                    </div>
                    <div>
                        <input {...register("pw")}type='password' placeholder="비밀번호를 입력해주세요" required></input>
                    </div>
                    <input type='submit'></input>
            </form>
        </main>
    )
}