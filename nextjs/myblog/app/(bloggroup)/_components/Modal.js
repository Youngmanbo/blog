import styles from "./modal.module.css";
import { IoCloseSharp } from "react-icons/io5";

export default function Modal({onClose, children}){
    return(
        <div className={styles.container}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <IoCloseSharp 
                        className={styles.closeBtn}
                        onClick={onClose}
                    />
                </div>
                <div className={styles.body}>{children}</div>
                <div className={styles.footer}></div>
            </div>
        </div>
    )
}