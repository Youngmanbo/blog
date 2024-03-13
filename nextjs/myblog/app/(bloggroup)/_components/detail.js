import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "./detail.module.css";

export default function Detail(probs){
    const data = probs.data;
    console.log("userdata",data);
    const onClick = (e) => {
        e.preventDefault()
        
    }
    return(
        <main className={styles.container}>
            <h1>{data.title}</h1>
            <section className={styles.content}>
                <Markdown remarkPlugins={[remarkGfm]}>{data.content}</Markdown>
            </section>
            <div className={styles.userInfo}>
                    <p> 작성자 : {data.writer.email}</p>
            </div>
            <div className={styles.comment}>
                <textarea placeholder="댓글을 입력해주세요"></textarea>
                <button>댓글달기</button>
            </div>
        </main>
    )
}