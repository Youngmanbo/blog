import styles from "./imgPost.module.css";

export default function ImgPost(probs){
    const image = probs.image;
    const postData = probs.postData;
    return(
        <>
            <img className={styles.img} src={image.src} alt={image.alt}></img>
            <div className={styles.contentContainer}>
                <h3>{postData.title}</h3>
                <div>{postData.content}</div>
            </div>
            <div className={styles.writer}>{postData.writer}</div>
        </>
    )
}