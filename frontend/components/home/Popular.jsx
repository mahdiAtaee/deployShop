/* eslint-disable react/prop-types */
import React from 'react'
import Card from './Card';

const Popular = ({ products }) => {
  return (
    <section className="section-gap mt-md-0 p-md-4">
      <Card products={products} title="محبوب ترین" />
    </section>
  )
}

export default Popular