"use client";
import { useSetRecoilState } from 'recoil';
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import axios from "axios";
import {userState} from "@/app/(bloggroup)/_lib/atoms";
import styles from "./registerform.module.css";
import { IoCloseSharp } from "react-icons/io5";

export default function RegisterForm (){

    const { register, 
            handleSubmit,
            formState: { errors },
            getValues,
        } = useForm({ mode: "onChange" });
    const setUser = useSetRecoilState(userState);
    const router = useRouter();
    const onSubmit = async (data) => {

        const baseUrl = 'http://localhost:8000/api/user/signup/';
        const response = await axios.post(baseUrl, {
            email:data.email,
            password:data.pw
        })
        if (response.status !== 201) {
            alert(response.status);
        }
        setUser((current) => ({...current,
                    isLogin:true,
                    userName:response.data?.user.email,
                }));
        router.push("/");

    }
    const onClick = () => {
        router.back();
    }
    return(
        <div className={styles.modal}>
            <div className={styles.container}>
                <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.modalHeader}>
                            <IoCloseSharp className={styles.closeBtn}
                                onClick={onClick}
                            />
                    </div>
                    <h1>회원가입</h1>
                    <div className={styles.modalBody}>
                        <div className={styles.inputBox}>
                            <label htmlFor="email">이메일 </label>
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
                            <label htmlFor="password">비밀번호 </label>
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
                            <label htmlFor="passwordCheck">비밀번호 확인 </label>
                            <input {...register("pwCheck", {
                                required:true,
                                validate:{
                                    check:(value) => 
                                        value === getValues("pw") ? true : "비밀번호가 일치하지 않습니다"
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
                        
                        <input className={styles.submitBtn} type='submit' value="회원가입"/>
                    </div>

                </form>
            </div>
        </div>
    )
}