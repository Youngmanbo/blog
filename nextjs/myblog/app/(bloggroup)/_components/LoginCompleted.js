"use client";
import Link from "next/link";
import styles from "./loginCompleted.module.css";
import { signOut } from "next-auth/react"

export default function LoginCompleted(probs){
    return(
        <div className={styles.container}>
            <Link href="/post" className={styles.post}>글쓰기</Link>
            <div>{probs.session.user.email.email}</div>
            <button className={styles.logOutBtn} onClick={() => signOut()}>LogOut</button>
        </div>
    )
}