/* eslint-disable react/prop-types */
import React from 'react'
import ProductList from './List'

const Products = ({items}) => {
  return (
    <>
        <ProductList products={items}/>
    </>
  )
}

export default Products