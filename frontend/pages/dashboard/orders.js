import OrdersList from '@/components/dashboard/orders'
import Dashboard from '@/components/layouts/Dashboard'
import React from 'react'

const order = () => {

  return (
    <Dashboard title="سفارشات">
        <OrdersList />
    </Dashboard>
  )
}

export async function getStaticProps() {
  // const orders = await API.get('/orders', {
  //   headers: {
  //     Authorization: localStorage.getItem('token')
  //   }
  // })

  return {
    props: {
    }
  }
}

export default order