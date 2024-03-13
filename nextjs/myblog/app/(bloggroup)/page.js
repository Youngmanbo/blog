import axios from "axios";
import Post from "./_components/Post";
import styles from "./_components/page.module.css";
import Link from "next/link";

export default async function Home(){
    
    const resp = await axios.get(`${process.env.NEXT_PUBLIC_LOCAL_BASE_URL}/post/`);
    return(
        <div className={styles.container}>
            {resp.data.map((x)=>{
                console.log(x)
                return(
                    <Link key={x.id} href={{
                        pathname:'/detail/'+x.id,
                    }}>
                        <Post key={x.id} data={x}/>
                    </Link>
                )
            })}
        </div>
    )
}