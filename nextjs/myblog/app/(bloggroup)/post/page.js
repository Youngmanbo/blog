"use client"
import axios from "axios";
import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";
import { useRouter } from "next/router";
import { Cookies } from "react-cookie";
import { useSession } from "next-auth/react";

export default function Post(){
    const [title, setTitle] = useState("제목");
    const [text, setText] = useState("");
    const {data:session} = useSession();
    const onChange = (e) => {
        setTitle(e.target.value)
    }
    const onClick = async (e) => {
        const cookies = new Cookies();
        const access = cookies.get('access');
        const headers = {
            "Authorization":"Bearer "+access 
        }

        const data = {
            'title':title,
            'content':text,
            'writer':session.user.email.id,
        }
        console.log("data",data);
        const resp = await axios.post(`${process.env.NEXT_PUBLIC_LOCAL_BASE_URL}/post/`, 
            data,
            {headers:headers},
        )
        if (resp.status==201){
            console.log(resp.data);
        }
    }
    return(
        <div className="container">
            <input className="title"
                placeholder="제목"
                onChange={onChange}>
            </input>
            <MDEditor
                value={text}
                onChange={setText}
                height={800}
            />
            <button onClick={onClick}>작성하기</button>
        </div>
    )
}