import React from 'react'
import ShopLayout from '@/components/layouts/Shop'
import Checkout from '@/components/checkout'

const checkout = () => {
    return (
        <ShopLayout title="صفحه بررسی سبد خرید">
            <Checkout />
        </ShopLayout>
    )
}

export default checkout