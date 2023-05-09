import React, { useEffect } from 'react'
import { useAuthContext } from 'context/AuthContext'
import { useNavigate } from 'react-router-dom'
import AddItem from './AddFoodItem'
import './_management.scss'

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
            <div class="alert alert-info mx-2" role="alert">Note! Only management can see this page.</div>
            <div className="container ">
                <h1 className="text-center mt-5 fw-bold">MANAGEMENT</h1>
                <AddItem />
            </div>
        </>
    )
}
