"use client";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import axios from "axios";
import {userState} from "@/app/(bloggroup)/_lib/atoms";
import styles from "./registerform.module.css";
import { IoCloseSharp } from "react-icons/io5";
import {redirect} from "next/navigation";
import test from "@/app/(bloggroup)/_lib/signup";

export default function RegisterForm (probs){

    const { register, 
            handleSubmit,
            formState: { errors },
            getValues,
        } = useForm({ mode: "onChange" });
    const router = useRouter();
    const setIsLoginForm = probs.state
    const onSubmit = async (data) => {
        console.log("data", data)
        const baseUrl = 'http://127.0.0.1:8000/api/user/signup/';
        const publick = `${process.env.API_BASE_URL}user/signup`;
        const response = await axios.post(`http://localhost:8000/api/user/signup/`, {
            email:data.email,
            password:data.pw
        })
        if (response.status !== 201) {
            setMessage("아이디와 비밀번호가 일치하지 않습니다.")
        }else{
            router.back("/");
        }

    }
    const onClick = () => {
        router.back();
    }
    const onLogin = (e) => {
        e.preventDefault()
        setIsLoginForm(true);
    }
    return(

        <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
            <h1>회원가입</h1>
            <div className={styles.modalBody}>
                <div className={styles.inputBox}>
                    <input {...register("email",
                        {
                            required:true,
                            pattern: {
                                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
                                message: "유효한 이메일 주소를 입력해주세요",
                            },

                        })}
                        id="email"
                        type='email' 
                        placeholder="Email" 
                    />
                </div>
                {errors.email && <small role="alert" className={styles.alert}>{errors.email.message}</small>}
                
                <div className={styles.inputBox}>
                    <input {...register("pw", {
                        required:true,
                        pattern: {
                            value: /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z\d]).{6,}$/,
                            message: "숫자, 영문자, 특수기호를 모두 포함한 6자리 이상의 비밀번호를 입력해주세요",
                        },
                    })}
                    id="password"
                    type='password' 
                    placeholder="비밀번호" 
                    />
                </div>
                {errors.pw && <small role="alert" className={styles.alert}>{errors.pw.message}</small>}
                
                <div className={styles.inputBox}>
                    <input {...register("pwCheck", {
                        required:true,
                        validate:{
                            check:(value) => 
                                value === getValues("pw") ? undefined : "비밀번호가 일치하지 않습니다"
                        },
                    })}
                        id="passwordCheck"
                        type='password' 
                        placeholder="비밀번호확인" 
                    />
                </div>
                {errors.pwCheck && (
                    <small role="alert" className={styles.alert}>
                    {errors.pwCheck.message}
                    </small>
                )}
                <div className={styles.btnContainer}>
                    <input className={styles.submitBtn} type='submit' value="회원가입"/>
                    <button onClick={onLogin}>로그인</button>
                </div>
            </div>

        </form>
    )
}