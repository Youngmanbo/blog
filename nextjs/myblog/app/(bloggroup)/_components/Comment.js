import styles from "./comment.module.css";
import dateFormat from "../_lib/dateFormat";

const Reply = (probs) =>{
    const comment = probs.comment;
    return(
        <div className={styles.reply}>
            <p>작성자 : {comment.writer_email}</p>
            <p>{dateFormat(comment.updated_at)} 작성됨</p>
            <p>{comment.content}</p>
            {comment.child_comments && comment.child_comments.length>0 &&(
                <div className={styles.replyContainer} key={comment.id}>
                    {comment.child_comments.map(childComment =>(
                        <Reply key={childComment.id} comment={childComment} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default function Comment(probs){
    const comment = probs.comment;
    return(
        <div className={styles.container} key={comment.id}>
            <p>작성자 : {comment.writer_email}</p>
            <p>{dateFormat(comment.updated_at)} 작성됨</p>
            <p>{comment.content }</p>
            {comment.child_comments && comment.child_comments.length>0 &&(
                <details className={styles.replyContainer} key={comment.id}>
                    <summary >{comment.child_comments.length}개의 답글</summary>
                    {comment.child_comments.map(childComment =>(
                        <Reply key={childComment.id} comment={childComment} />
                    ))}
                </details>
            )}
        </div>
    )
}