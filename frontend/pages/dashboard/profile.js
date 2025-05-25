import React from 'react'
import Dashboard from '@/components/layouts/Dashboard'
import Profile from '@/components/dashboard/profile'

const profile = () => {
  return (
    <Dashboard title="سفارشات"> 
      <Profile />
    </Dashboard>
  )
}

export default profile