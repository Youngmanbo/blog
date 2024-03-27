import Detail from "../../_components/Detail";

async function getData(id){
    const resp = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_BASE_URL}/post/${id}`);
    
    if (!resp.ok){
        throw new Error("Failed to fetch data");
    }
    
    return resp.json()
}

async function getCommentData(id){
    const resp = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_BASE_URL}/comments/${id}/get_post_comment`);

    if (!resp.ok){
        throw new Error("Failed to fetch data")
    }   
    return resp.json()
}

export default async function Page({params}){

    const data = {};
    const post = await getData(params.id);
    const comment = await getCommentData(params.id);
    data['post'] = post
    data['comment'] = comment
    return(
        <Detail data={data}/>
    )
}