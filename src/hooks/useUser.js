import { useState } from "react";
import { getUser as getUserApi } from "../services/apiAuth";
export function useUser(){
    const [user,setUser]=useState();
    async function getUser() {
        const data=await getUserApi()
        setUser(user)
    }
    return {user}
}