"use client";
import {RecoilRoot} from "recoil";

export default function RecoilWraper({children}){
    return <RecoilRoot>{children}</RecoilRoot>;
}