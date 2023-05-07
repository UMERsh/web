import React, { useEffect } from 'react'
import FoodItems from './FoodItems'
import { useAuthContext } from 'context/AuthContext'
import { useNavigate } from 'react-router-dom'
import AddItem from './AddItem'

export default function Index() {
    const { userRole, userData } = useAuthContext()
    const navigate = useNavigate()

    useEffect(() => {
        if (userRole !== "") {
            if (userRole !== "manager") {
                navigate('/')
            }
        }
    }, [userRole])


    useEffect(() => {
        if (userRole === "" && !userData.length) {
            navigate('/')
        }

    }, [userData.length])

    return (
        <>
            <div className="container mt-5">
                <h1 className="text-center fw-bold">ADD PRODUCTS</h1>
                <AddItem />
            </div>
        </>
    )
}
