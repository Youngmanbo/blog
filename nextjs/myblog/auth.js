import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from 'next/headers'
import {parse} from 'cookie';
import axios from "axios";

export const {
    handlers: { GET, POST },
    auth,
    signIn
} = NextAuth({
    pages: {
        signIn: '/login',
        newUser: '/register',
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials){
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
                        cookies().set('access', access?.access, );
                        cookies().set('refresh', refresh?.refresh, {
                            httpOnly:true,
                        }); 
                    }

                    return {
                        email:resdata.user,
                        token:resdata.token,
                        ...resdata,
                    }
                }else{
                    return null
                } 
            }
        })
    ],
    callbacks: {
        async redirect({ url, baseUrl }) {
            console.log("test", url, baseUrl);
            if (url.startsWith("/")) return `${baseUrl}${url}`
            return baseUrl
          },
        async jwt({user, token}) {
            if(user){
                console.log(token)
                console.log(user.token.access)
                token.access = user.token.access
                token.refresh = user.token.refresh
            }
    
            return token;
        },
        async session({ session, newSession, user}) {
          
          return session;
        }
      },
    session: {
        jwt:true
    },
    events: {
        signOut(data) {
          console.log('auth.ts events signout', 'session' in data && data.session, 'token' in data && data.token);
          // if ('session' in data) {
          //   data.session = null;
          // }
          // if ('token' in data) {
          //   data.token = null;
          // }
        },
        session(data) {
          console.log('auth.ts events session', 'session' in data && data.session, 'token' in data && data.token);
        }
      },
})