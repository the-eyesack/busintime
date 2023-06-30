'use client'
import {UserAuth} from "@/app/context/AuthContext";
import {useRouter} from "next/navigation";
import ProtectedRoute from "@/app/components/ProtectedRoute";

export default function Account() {
    const { user, logout } = UserAuth()
    const router = useRouter()
    async function handleLogOut() {
        try {
            await logout()
            router.push('/')
        } catch (e) {
            console.log(e.message)
        }
    }

    if(!user) {
        console.log('not logged in')
        return router.push('/');
    }

    return (
        <ProtectedRoute>
            <h1>Account</h1>
            <p>Email: {user && user.email}</p>
            <button type={"button"} onClick={handleLogOut}>Sign Out</button>
        </ProtectedRoute>
    )
}