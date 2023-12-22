import {atom} from "recoil";

export const userState = atom({
    key:"LoginAtom",
    default:{
        isLogin:false,
        userName:null,
        userProfile:null,
    }
});