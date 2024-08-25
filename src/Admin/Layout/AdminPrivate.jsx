import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { toast } from 'react-toastify'

const AdminPrivate = () => {

  const Admintoken = localStorage.getItem('adminToken')


  if (!Admintoken) {
    toast.error("First Login Admin to Enter into Admin panel")
  }
  return (Admintoken ? <Outlet /> : <Navigate to={"/admin/login"} />)



}

export default AdminPrivate