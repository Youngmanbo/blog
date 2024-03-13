"use client";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import axios from "axios";
import { signIn } from "next-auth/react";
import styles from "./loginForm.module.css";
import Link from "next/link";

const LoginForm = (probs) => {
    const { register, handleSubmit } = useForm();
    const router = useRouter();
    const setIsLoginForm = probs.state;

    const onSubmit = async (data) => {
        let isRedirect = false;
        try{
            const response = await signIn("credentials",{
            username:data.id,
            password:data.pw,
            redirect:false,
            })

            if(response?.ok){
                isRedirect = true;
            }


        }catch(err){
            console.log(err);
        }
        if(isRedirect){
            router.back();
        }
    };
    const onClick = (e) => {
        e.preventDefault()
        setIsLoginForm(false)

    }
    return (
            <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
                <h1>로그인</h1>
                <input {...register("id")} type='email' placeholder="Email" required />

                <input {...register("pw")} type='password' placeholder="PassWord" required />
                <div className={styles.btnContainer}>
                    <input className={styles.submit} type='submit' value='로그인'/>
                    <div className={styles.link} onClick={onClick}>회원가입</div>
                </div>
            </form>
    );
};

export default LoginForm;
