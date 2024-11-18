'use client'

import { auth } from "@/app/db/firebaseConfig"
import useClientAuth from "@/app/hooks/useClientAuth"
import { signOut } from "firebase/auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const Dashboardpage = () => {
    const router = useRouter()
    const { user, redirectIfAuthenticated } = useClientAuth()

    useEffect(() => {
        redirectIfAuthenticated()
        user ? "" : router.push('/signin')
    }, [user])

    const handleSignOut = () => {
        signOut(auth).then(() => console.log('deconnexion')).catch((error) => console.error(error))
        router.push('/')
    }

    return (
        <>
            {
                user && (<div className="h-screen w-full flex items-center justify-center flex-col">
                    <h1 className="text-4xl uppercase font-black">
                        page dashboard
                    </h1>

                    <p><b>your email : </b> {user?.email}</p>

                    <button type="button" onClick={handleSignOut} className="bg-gray-600 px-3 py-1.5 text-white my-3 rounded-md hover:bg-gray-700">
                        Logout
                    </button>
                </div>)
            }
        </>
    )
}

export default Dashboardpage