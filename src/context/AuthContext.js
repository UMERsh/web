import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth, firestore } from 'config/Firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore/lite';

const AuthContext = createContext()

export default function AuthContextProvider(props) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [userData, setUserData] = useState({})
    const [userRole, setUserRole] = useState("")


    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserData(user)
                setIsAuthenticated(true)
                gettingRole(user.email)
            } else {
                setUserRole("")
                setIsAuthenticated(false)
            }
        })
    }, [userRole])

    const gettingRole = async (email) => {
        const q = query(collection(firestore, "users"), where("email", "==", email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const data = doc.data().user_role
            setUserRole(data)
        });

    }
    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, userData, userRole }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    return useContext(AuthContext);
}