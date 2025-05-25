/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import * as api from '@/services/api'
import Filter from '@/components/category/Filter'
import ProductItem from '@/components/category/ProductItems'
import ShopLayout from '@/components/layouts/Shop'
import { useRouter } from 'next/router'

const Category = ({ products, category }) => {
    const [productList, setProductList] = React.useState(products)
    const router = useRouter()
    const { slug } = router.query
    useEffect(() => {
        api.get(`/categories/${slug}/products?${new URLSearchParams(router.query).toString()}`)
            .then((response) => {
                if (response.status == 200) {
                    setProductList(response.data.products)
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }, [router.query])


    if (router.isFallback) {
        return (
            <h1>Loading ...</h1>
        )
    }
    return (
        <ShopLayout title="دسته بندی">
            <div className='container my-5 py-5'>
                <div className='row'>
                    <Filter category={category} />
                    <ProductItem products={productList} />
                </div>
            </div>
        </ShopLayout>
    )
}

export async function getStaticProps({ params }) {
    const { slug } = params
    let response = {
        status: 404
    }
    try {
        response = await api.get(`/categories/${slug}/products`)
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
export async function getStaticPaths() {
    let paths = []
    try {
        const response = await api.get('/categories')
        paths = response.data.categories.map(category => ({
            params: { slug: category.slug }
        }))
    } catch (error) {
        console.log(error)
    }

    return {
        paths,
        fallback: true
    }
}


export default Category