import React, { createContext, useEffect, useState } from 'react'
import { auth, db } from '../firebase'

export const UserContext = createContext()

export const UserProvider = ({children}) => {

    const userInitial = {
        name: null,
        email: null,
        image: null,
        active: null,
    }

    const [user, setUser] = useState(userInitial)
    const [loadingUser, setLoadingUser] = useState(false)

    useEffect(() => {

        const getUser = () => {

            auth.onAuthStateChanged((authUser) => {
                
                if (authUser) {

                    setUser({
                        name: authUser.displayName || authUser.email.split('@')[0],
                        email: authUser.email,
                        image: authUser.photoURL || 'https://lh3.googleusercontent.com/proxy/kBHvjobpDOR2qqKWq5S7tR2KhHsoicraGhGXlE6zS9iBO-KXuh5NT4QkWSlv6qOpynfBJmIdDIaamfPeml4g6zIRgBAY1Ow',
                        active: true
                    })

                } else {
                    setUser({
                        name: null,
                        email: null,
                        image: null,
                        active: false
                    })
                }

            })
        
        }

        getUser()

    }, [])


    const registerUser = async (name, email, password) => {

        try {
            setLoadingUser(true)
            await auth.createUserWithEmailAndPassword(email, password)

            await db.collection('users').doc(email).set({
                name,
                email,
                image: 'https://lh3.googleusercontent.com/proxy/kBHvjobpDOR2qqKWq5S7tR2KhHsoicraGhGXlE6zS9iBO-KXuh5NT4QkWSlv6qOpynfBJmIdDIaamfPeml4g6zIRgBAY1Ow'
            })
            setLoadingUser(false)

        }catch(error){
            setLoadingUser(false)
            console.log(error.message)
        }

    }

    const loginUser = async (email, password) => {

        try {

            setLoadingUser(true)
            await auth.signInWithEmailAndPassword(email, password)
            setLoadingUser(false)

        } catch(error) {
            setLoadingUser(false)
            console.log(error.message)
        }

    }

    const signOut = () => {
        auth.signOut()
    }

    return (
        <UserContext.Provider value={{registerUser, loginUser, user, signOut, loadingUser}}>
            {children}
        </UserContext.Provider>
    )
}