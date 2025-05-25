import React from 'react'
import Items from './Items'
import Coupon from './Coupon'
import Details from './Details'

const Basket = () => {
    return (
        <section className="w-dvw min-h-dvh flex flex-col md:flex-row items-start justify-between gap-4 my-6 p-6">
            <Items />
            <div className="w-full basis-xs">
                <Coupon />
                <Details />
            </div>
        </section>
    )
}

export default Basket