"use client"
import LoginForm from "../_components/LoginForm";
import { userState } from "../_lib/atoms";
import { useRecoilState } from "recoil";

export default function Login(){
    const [user, setUser] = useRecoilState(userState);
    return(
        <>
        <LoginForm></LoginForm>
        {user.isLogin? "red":"blue"}
        로그인
        </>
    )
}