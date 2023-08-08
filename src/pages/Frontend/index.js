import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Navbar from 'components/Header/Navbar'
import Footer from 'components/Footer/Footer'
import Management from './management'
import Restuarant from 'pages/Frontend/restuarant/index'
import LoaderAnimation from 'components/LoaderAnimation'
import Membership from 'pages/Frontend/membership'
import Nopage from 'pages/Nopage'
import Expenses from '../../pages/Frontend/expenses'
import { useAuthContext } from 'context/AuthContext'
import Inventory from '../../pages/Frontend/inventory'
import PayRoll from '../../pages/Frontend/payroll'

export default function Index() {
    const { userRole } = useAuthContext()
    return (
        <>
            <Navbar />
            {userRole == ""
                ? <LoaderAnimation />
                : <>
                    <main >
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='restuarant/*' element={userRole !== "" && userRole == 'restuarant_staff' || userRole == 'restuarant_manager' ? <Restuarant /> : <Home />} />
                            <Route path='management/*' element={userRole !== "" && userRole == 'manager' || userRole == 'restuarant_manager' || userRole == 'restuarant_staff' ? <Management /> : <Home />} />
                            <Route path='membership/*' element={userRole !== "" && userRole == 'staff' || userRole == 'manager' ? <Membership /> : <Home />} />
                            <Route path='expenses/*' element={userRole !== "" && userRole == 'manager' ? <Expenses /> : <Home />} />
                            <Route path='inventory/*' element={userRole !== "" && userRole == 'manager' || userRole == 'restuarant_staff' ? <Inventory /> : <Home />} />
                            <Route path='payroll/*' element={userRole !== "" && userRole == 'manager' || userRole == 'restuarant_staff' ? <PayRoll /> : <Home />} />
                            <Route path='*' element={<Nopage />} />
                        </Routes>
                    </main >
                    <Footer />
                </>
            }
        </>
    )
}
