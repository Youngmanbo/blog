import Detail from "../../_components/detail";

async function getData(id){
    const resp = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_BASE_URL}/post/${id}`);
    
    if (!resp.ok){
        throw new Error("Failed to fetch data");
    }
    
    return resp.json()
}

export default async function Page({params}){

    const data = await getData(params.id);

    return(
        <Detail data={data}/>
    )
}