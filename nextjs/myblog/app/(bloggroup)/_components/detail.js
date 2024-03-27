import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "./detail.module.css";
import Comment from "./Comment";
import PostComment from "./PostComment";

export default function Detail(probs){
    const data = probs.data.post;
    const comments = probs.data.comment;
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
                {/* <textarea placeholder="댓글을 입력해주세요"></textarea>
                <button>댓글달기</button> */}
                <PostComment post={data.id} parrentComment={null}></PostComment>
            </div>
            <div className={styles.commentContainer}>
                {comments.map(comment => (
                    <Comment comment={comment}></Comment>
                ))}
            </div>
        </main>
    )
}