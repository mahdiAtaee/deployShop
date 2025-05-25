/* eslint-disable react/prop-types */
import React from 'react'
import ProductItem from '../products/List/ProductItem'
import { ErrorBoundary } from 'next/dist/client/components/error-boundary'

const ProductItems = ({ products }) => {
    return (
        <ErrorBoundary errorComponent={<p>Somethings was wrong!!!</p>}>
            <div className='col-12 col-md-9'>
                <div className='row'>
                    {products && products.map(product => (
                        <div className='col-6 col-md-4' key={product.id}>
                            <ProductItem {...product} />
                        </div>
                    ))}
                </div>
            </div>
        </ErrorBoundary>
    )
}

export default ProductItems