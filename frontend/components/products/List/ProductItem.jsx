import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { toPersianNumber } from '@/services/lang'

const ProductItem = (product) => {
    const isSpecialOffer = (price, discountedPrice) => {
        return discountedPrice && discountedPrice > 0 && discountedPrice < price
    }

    const discountPercent = (discountedPrice, originalPrice) => {
        return discountedPrice && originalPrice && Math.round(Math.ceil(((originalPrice - discountedPrice) / originalPrice) * 100))
    }

    function truncate(str, maxLen = 8) {
        if (str.length <= maxLen) {
            return str;
        }
        return str.slice(0, maxLen) + '…';
    }

    return (
        <div className="card product border-0 bg-white rounded-2xl p-4 min-h-full flex flex-col items-stretch">
            <div className="relative flex items-center justify-center">
                {isSpecialOffer(product.price, product.discountedPrice) ? <div className="absolute top-1 left-1 bg-red-100 py-1 px-2 rounded-xl text-red-500">ویژه</div> : null}
                <Image
                    className="card-img-top"
                    src={product.thumbnail}
                    alt="card image"
                    width={180}
                    height={200}
                />
            </div>
            <div className="card-body py-4 text-right grow flex flex-col justify-between">
                <h6 className="mb-2 text-gray-600 text-md font-IranYekan">
                    <Link href={`/products/${product.id}`}>
                        {truncate(product.title, 60)}
                    </Link>
                </h6>
                <span className='text-xs md:!text-md text-red-400'>
                    تنها {product.stock} در انبار باقی مانده است
                </span>
                <div className="price my-3">
                    {product.discountedPrice > 0 ? (
                        <div className='flex items-end justify-between'>
                            <span className='py-1 px-4 bg-red-500 text-white rounded-xl text-md'>{toPersianNumber(discountPercent(product.discountedPrice, product.price))} %</span>
                            <div className='flex flex-col text-left font-iranYekan'>
                                <del className="text-gray-400 mr-2">
                                    <span className="text-md">{toPersianNumber(product.price)} تومان</span>
                                </del>
                                <span className="text-md md:!text-lg">{toPersianNumber(product.discountedPrice)} تومان</span>
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

export default ProductItem