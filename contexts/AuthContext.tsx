"use client"

import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
import { auth } from "@/config/firebase";
import LoaderOne from "@/components/Loaders/LoaderOne";

const AuthContext = createContext<any>({})

export const useAuth = () => useContext(AuthContext)

export const AuthContextProvider = ({children} : {children: React.ReactNode}) => {
    const [user, setUser] = useState<any>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                })
            } else {
                setUser(null)
            }
            setIsLoading(false)
        })

        return () => {
            unsubscribe()
        }
    }, [])

    const signUp = async (email: string, password: string, name: string) => {
        return createUserWithEmailAndPassword(auth, email, password).then(res => updateProfile(res.user, { displayName: name }))
    }

    const login = async (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = async () => {
        setUser(null)
        await signOut(auth)
    }

    return (
        <AuthContext.Provider value={{user, login, signUp, logout, isLoading, setIsLoading}}>
            {isLoading ? <LoaderOne/> : children}
        </AuthContext.Provider>
    )
}