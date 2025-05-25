import React from 'react'
import ShopLayout from '@/components/layouts/Shop'
import * as api from '@/services/api'
import Category from '@/components/category'

const index = () => {
    return (
        <ShopLayout title="دسته بندی محصولات">
            <Category />
        </ShopLayout>
    )
}

export async function getStaticProps() {
    let response = {
        status: 404
    }
    try {
        response = await api.get(`/categories/products`)
    } catch (error) {
        console.log(error)
    }

    return {
        props: {
            products: response.status == 200 ? response.data.products : [],
            category: response.status == 200 ? response.data.category : []
        }
    }
}

export default index