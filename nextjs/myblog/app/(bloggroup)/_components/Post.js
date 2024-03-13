"use client";
import styles from "./post.module.css";
import ImgPost from "./ImgPost";
import Link from "next/link";

export default function Post(probs){
    const postData = probs.data;
    console.log(postData);
    const markdown = postData.content;
    const getImgFromMarkDown = (markdwon)=>{
        const imgRex = /!\[(.*?)\]\((.*?)\)/g;
        let match = imgRex.exec(markdown);

        const image = match?{
            'alt':match[1],
            'src':match[2]
        }:null

        return image;
    }
    const image = getImgFromMarkDown(markdown);
    const path = '/detail/' + postData.id
    
    return(
        <div className={styles.itemContainer}>
            {image ?
                <img src={image.src} alt={image.alt}/>
                : null}
            <h2>{postData.title}</h2>
            <div className={image?
                styles.imgContent:
                styles.noImgContent}>
                {postData.content}
            </div>
            <p>작성자: {postData.writer_email}</p>
        </div>
    )
}