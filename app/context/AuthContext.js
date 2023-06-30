'use client'
import {createContext, useContext, useEffect, useState} from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase/config'

const UserContext = createContext(null);
export function AuthContextProvider({children}) {
    const [user, setUser] = useState({});
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = () => {
        return signOut(auth)
    }

    //auth state change
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log(user)
            setUser(user)
        })
        return () => {
            unsubscribe()
        };
    }, []);

    
    return (
        <UserContext.Provider value={{ createUser, user, logout, signIn }}>
            {children}
        </UserContext.Provider>
    )
}

export function UserAuth() {
    return useContext(UserContext)
}