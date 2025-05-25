/* eslint-disable react/prop-types */
import React from 'react'
import Card from './Card';

const MostViewed = ({ products }) => {
    return (
        <section className="section-gap mt-md-0 p-md-4">
            <Card products={products} title="بیشترین بازدید"/>
        </section>
    )
}

export default MostViewed