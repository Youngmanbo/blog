"use client"
import Modal from "../_components/Modal";
import LoginForm from "../_components/LoginForm";
import RegisterForm from "../_components/RegisterForm";
import { useRouter } from 'next/navigation';
import { useState } from "react";

export default function Page(){
    const router = useRouter()
    const [isLoginForm, setIsLoginForm] = useState(true);
    const onClose = () => {
        router.back()
    }
    return(
        <Modal onClose={onClose}>
            {isLoginForm?
                <LoginForm state={setIsLoginForm}/>:
                <RegisterForm state={setIsLoginForm}/>}
        </Modal>
    )
}