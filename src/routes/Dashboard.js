import React, { useState } from 'react'
import CustomerDashboard from '../pages/Customer/CustomerDashboard'
import AdminDashboard from '../pages/Admin/AdminDashboard'
import MentorDashboard from '../pages/Mentor/MentorDashboard'

function Dashboard() {

    const [user_type, setUserType] = useState("customer")

  return (
    <>
     {user_type === "admin" ? (
        <AdminDashboard />
      ) : user_type === "customer" ? (
        <CustomerDashboard />
      ) : (
       <MentorDashboard />
      )}
    </>
  )
}

export default Dashboard