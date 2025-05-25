import useAppContext from '@/context/useAppContext'
import { toPersianNumber } from '@/services/lang'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const BasketList = () => {
    const { state } = useAppContext()

    const totalBasket = () => {
        return state.basket.reduce((total, item) => {
            if (item.discountedPrice)
                return total + (item.count * item.discountedPrice)

            return total + (item.count * item.price)
        }, 0)
    }

    return (
        <div className="flex-1/3 p-4">
            <h5 className="flex items-center gap-2 mb-4">
                <span className="text-gray-400 text-xs md:text-lg">سبد خرید شما</span>
                <span className="rounded-full bg-black text-white px-3 text-xs md:text-lg">{toPersianNumber(state.basket.length)}</span>
            </h5>
            <ul className=" mb-3">
                {state.basket.map((item) => (
                    <li key={item.productID} className="shadow-sm shadow-gray-300 rounded p-4 my-4 flex items-center gap-4">
                        <div className='flex-2/4 flex flex-col md:flex-row gap-4'>
                            <Image src={item.thumbnail} width={60} height={60} alt='thumbnail' />
                            <div>
                                <Link href={`/product/${item.productID}`} className="block my-0 text-xs md:text-lg">{item.title}</Link>
                                <small className="text-muted">تعداد {item.count}</small>
                            </div>
                        </div>
                        <span className="text-left flex-1/4 text-xs md:text-lg"> {toPersianNumber(item.discountedPrice > 0 ? item.discountedPrice : item.price)} تومان</span>
                    </li>
                ))}
                <li className="w-full text-left px-4 text-xs md:text-lg">
                    <span>مجموع (تومان)</span>
                    <strong> {toPersianNumber(totalBasket())} تومان</strong>
                </li>
            </ul>
        </div>
    )
}

export default BasketList