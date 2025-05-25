/* eslint-disable react/prop-types */
import React from 'react'
import Image from 'next/image'
import { BiSolidDiscount } from "react-icons/bi"
import { toPersianNumber } from '@/services/lang'


const DiscountedProduct = ({ products }) => {
    const discountPercent = (discountedPrice, originalPrice) => {
        return discountedPrice && originalPrice && Math.round(Math.ceil(((originalPrice - discountedPrice) / originalPrice) * 100))
    }
    return (
        <section className="mt-4 p-md-4">
            <div className='w-[98%] mx-auto rounded-xl border border-gray-300'>
                <h2 className='px-6 w-full leading-10 text-lg md:text-2xl my-4 flex items-center justify-start lg:justify-center gap-2'>
                    <BiSolidDiscount color='orange' />
                    <span>منتخب محصولات تخفیف و حراج
                    </span>
                </h2>
                <div className='w-full h-max grid grid-cols-2 lg:grid-cols-4 grid-rows-[repeat(2,minmax(150px,200px))] gap-4 my-8'>
                    {products && products.map((product) => {
                        if (product.discountedPrice) {
                            return (
                                <div key={product.id} className='w-full px-4 flex flex-col items-center gap-4 min-h-32'>
                                    <div className='h-64 w-full md:min-w-64 relative basis-full'>
                                        <Image src={product.thumbnail} fill alt='pic' className='object-contain' />
                                    </div>
                                    <div className='flex items-center gap-3 border-b-2 border-gray-200'>
                                        <div className="price my-3">
                                            {product.discountedPrice > 0 ? (
                                                <div className='flex items-end justify-between'>
                                                    <span className='py-1 px-2 bg-red-500 text-white rounded-xl text-md mx-4'>{toPersianNumber(discountPercent(product.discountedPrice, product.price))} %</span>
                                                    <div className='flex flex-col text-left font-iranYekan'>
                                                        <del className="text-gray-400 mr-2">
                                                            <span className="text-xs">{toPersianNumber(product.price)} تومان</span>
                                                        </del>
                                                        <span className="text-md">{toPersianNumber(product.discountedPrice)} تومان</span>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div>
                                                    <span className="text-left block text-md md:!text-lg font-semiBold">{toPersianNumber(product.price)} تومان</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
        </section>
    )
}

export default DiscountedProduct