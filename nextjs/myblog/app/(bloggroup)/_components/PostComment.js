"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { Cookies } from "react-cookie";

export default function PostComment({style, post, parrentComment}){

    const [comment, setComment] = useState("");
    const { data:session, status } = useSession();
    const onChange = (e) => {
        setComment(e.target.value)
    }
    const onClick = async (e) => {
        e.preventDefault();
        if (status !== 'authenticated'){
            alert("로그인된 사용자만 댓글 입력이 가능합니다.")
            return
        }
        const cookies = new Cookies();
        const access = cookies.get('access');
        const headers = {
            "Authorization":"Bearer "+access,
            "Content-Type": "application/json",
        }
        const data = {
            "content":comment,
            "post":post,
            "parrent_comment":parrentComment?parrentComment:null

        }
        const resp = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_BASE_URL}/comments/`,{
            method:"POST",
            headers:headers,
            body:JSON.stringify(data)
        })

        if (resp.ok){
            alert("댓글이 등록되었습니다.")
        }
    } 
    return(
        <div style={style}>
            <textarea onChange={onChange}></textarea>
            <button onClick={onClick}>댓글 달기</button>
        </div>
    )
}