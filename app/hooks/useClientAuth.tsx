'use client'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../db/firebaseConfig'
import { useRouter } from 'next/navigation'
import { onAuthStateChanged, User, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useEffect, useState } from 'react'



const provider = new GoogleAuthProvider()

const useClientAuth = () => {
    const [user, setUser] = useState<User | null>(null)
    const [IsFetch, setIsFetch] = useState(true)
    const router = useRouter()

    const signUp = async (email: string, password: string) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            setUser(userCredential.user)
            router.push('/dashboard')
        } catch {
            console.log('erreur signUp')
        }
    }

    const signIn = async (email: string, password: string) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            setUser(userCredential.user)
            router.push('/dashboard')
        } catch {
            console.log('erreur signUp')
        }
    }

    const loginWithGoogle = async () => {
        const result = await signInWithPopup(auth, provider);
        const user = result.user
        if (user) {
            router.push('/dashboard')

        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
            if (user) {
                setUser(user)
                setIsFetch(false)
            } else {
                setUser(null)
                setIsFetch(false)
            }
        });
        return () => unsubscribe()
    }, [])

    const redirectIfAuthenticated = () => {
        // if (user) {
        //     router.push('/dashboard')
        // }
        user ? router?.push('/dashboard') : ''
    }

    return { user, IsFetch, signIn, signUp, redirectIfAuthenticated, loginWithGoogle }
}


export default useClientAuth