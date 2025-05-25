/* eslint-disable react/prop-types */
import React from 'react'
import Card from './Card';


const BestSellers = ({ products }) => {
    return (
        <section className="section-gap mt-0 p-md-4">
            <Card products={products} title="پر فروش ترین"/>
        </section>
    )
}

export default BestSellers