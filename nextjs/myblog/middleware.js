import { NextResponse } from 'next/server';


export async function middleware(request){
    // const session = await auth();
    // console.log(session);
    // if (!session){
    //     return NextResponse.redirect("http://127.0.0.1:3000/login");
    // }

}

export const config = {
    matcher: ['/post',]
}