//idk why this is broken

'use client'
import {useRouter} from "next/navigation";
import { UserAuth } from "@/app/context/AuthContext";

export default function ProtectedRoute({children}) {
    const router = useRouter()
    const user = UserAuth()
    if(!user) {
        console.log('not logged in')
        return router.push('/');
    } return children
}