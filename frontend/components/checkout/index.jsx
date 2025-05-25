import React from 'react'
import BasketList from './BasketList'
import Shipping from './Shipping'

const index = () => {
    return (
        <section className="w-screen flex flex-col gap-2 p-6">
            <BasketList />
            <Shipping />
        </section>

    )
}

export default index