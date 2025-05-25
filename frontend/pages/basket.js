import React from 'react'
import ShopLayout from '@/components/layouts/Shop'
import Basket from "@/components/basket"

const basket = () => {
  return (
    <ShopLayout title="سبد خرید">
        <Basket />
    </ShopLayout>
  )
}



export default basket