import NextAuth from "next-auth";
import axios from "axios";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextResponse } from "next/server";
import { cookies } from 'next/headers'
import { parse } from 'cookie';

const handler = NextAuth({
    pages: {
        signIn: '/login',
        newUser: '/register',
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials){
                const access =  cookies().get("access");
                const refresh = cookies().get("refresh");
                const baseUrl = `${process.env.NEXT_PUBLIC_LOCAL_BASE_URL}`;

                const authResponse = await axios.post("http://127.0.0.1:8000/api/auth/",{
                email:credentials.username,
                password:credentials.password,
                })
                const resdata = authResponse.data;
                if (resdata){
                    let setCookie = authResponse.headers.get('Set-Cookie');
                    
                    if (setCookie) {
                        
                        const access = parse(setCookie[0]);
                        const refresh = parse(setCookie[1]);
                        cookies().set('access', access?.access, {
                            maxAge:60*5,
                        });
                        cookies().set('refresh', refresh?.refresh, {
                            maxAge:60*60*24,
                            httpOnly:true,
                        }); 
                    }

                    return {
                        email:resdata.user,
                        token:resdata.token,
                        access:access,
                        ...resdata,
                    }
                }else{
                    return null
                } 
                
                
            }
        })
    ],
    callbacks: {
        async jwt({token, user}){
            if(user){
                token.access = user.access
                console.log("user", user)
            }
            return token;
        },
        async session({ session, newSession, user}) {
            const access =  cookies().get("access");
            const refresh = cookies().get("refresh");

            if (!access && refresh){
                console.log("access session")
                const rqData = {'refresh':refresh.value}; 
                const response = await axios.post(`${process.env.NEXT_PUBLIC_LOCAL_BASE_URL}/token/refresh/`,rqData)
                const data = response.data;
                console.log("type", data);
                cookies().set('access', data?.access, {
                    maxAge:60*5,
                });
            }else if(!access && !refresh){
                return NextResponse.redirect('/login');
            }
            return session;
        }
      },
    session: {
        jwt:true,
        maxAge:60*60*24,
    },
    events: {
        signOut(data) {
          console.log('auth.js events signout', 'session' in data && data.session, 'token' in data && data.token);
          // if ('session' in data) {
          //   data.session = null;
          // }
          // if ('token' in data) {
          //   data.token = null;
          // }
        },
        session(data) {
          
        }
      },
})

export { handler as GET, handler as POST }