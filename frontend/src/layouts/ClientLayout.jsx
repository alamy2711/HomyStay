import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext';

export default function ClientLayout() {
  const {user} = useAuth();
  if (user.role != "client") return <Navigate to="/dashboard" />;

  return (
    <Outlet/>
  )
}
