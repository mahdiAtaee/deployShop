import Dashboard from '@/components/layouts/Dashboard'
import React from 'react'
import RecentActivities from '@/components/dashboard'


const dashboard = () => {
    return (
        <Dashboard title="داشبورد">
            <RecentActivities />
        </Dashboard>
    )
}

export default dashboard