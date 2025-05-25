import React from 'react'
import ShopLayout from '@/components/layouts/Shop'
import Products from '@/components/products'
import Header from '@/components/products/Header'
import * as api from '@/services/api'

const products = ({ products }) => {

  return (
    <ShopLayout title="فروشگاه آنلاین">
      <Header />
      <Products items={products}/>
    </ShopLayout>
  )
}

export async function getStaticProps() {
  const products = await api.get('/products')
  
  return {
    props: {
      products: products.data
    }
  }
}

export default products