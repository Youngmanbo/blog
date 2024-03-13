"use client";
import Link from "next/link";

export default function LoginBtn(probs){

    return (
        <Link href="/login" className={probs.className}>로그인</Link>
    )
}