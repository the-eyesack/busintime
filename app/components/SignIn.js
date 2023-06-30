'use client'
import {useState} from "react";
import {UserAuth} from "@/app/context/AuthContext";
import {useRouter} from "next/navigation";

export default function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const { signIn } = UserAuth()
    const router = useRouter()
    async function handleSubmit(e) {
        e.preventDefault()
        setError('')
        try {
            await signIn(email, password)
            router.push('/account')
        }
        catch (e) {
            setError(e.message)
            console.log(e.message)
        }
    }
    return (
        <section className="border-2 m-4">
            Sign In
            <form onSubmit={handleSubmit}>
                <label>Email Address</label>
                <input type="email" placeholder="Email Address" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                <label>Password</label>
                <input type="password" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                <button>Sign in</button>
            </form>

        </section>
    )
}
