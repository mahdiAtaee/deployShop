/* eslint-disable react/prop-types */
import React from 'react'
import ProductItem from './ProductItem'

const ProductList = ({ products }) => {
    return (
        <section className="section-gap">
                <div className="w-full p-8 grid grid-cols-4 gap-2">
                    {products.map((product) => (
                        <div key={product.id} className='shadow shadow-gray-700 rounded'>
                            <ProductItem {...product}/>
                        </div>
                    ))}
                </div>
        </section>

    )
}

export default ProductList