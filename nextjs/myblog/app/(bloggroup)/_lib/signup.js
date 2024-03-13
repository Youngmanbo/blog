"use server";

import {redirect} from "next/navigation";
import axios from "axios";

export default async (email, password) => {
    const authUrl = `${process.env.IS_LOCAL?process.env.LOCAL_AUTH_URL:process.env.AUTH_URL}`;
    const response = await axios.post(authUrl+"/auth", {
        email:email,
        password:password,
    })
    console.log(response);
}