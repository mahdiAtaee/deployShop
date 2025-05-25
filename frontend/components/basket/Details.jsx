import useAppContext from '@/context/useAppContext'
import { amountWithDiscount, calculateDiscountAmount } from '@/services/discount'
import { toPersianNumber } from '@/services/lang'
import Link from 'next/link'
import React from 'react'

const Details = () => {
    const { state } = useAppContext()

    const TotalBasket = () => {
        return state.basket.reduce((total, item) => {
            if (item.discountedPrice != 0) {
                return total + (item.count * item.discountedPrice)
            }
            return total + (item.count * item.price)
        }, 0)
    }

    return (
        <div className="px-4">
            <div className="w-full">
                <h6 className='text-md md:!text-xl w-full border-b border-gray-300 py-2'>مجموع سبد</h6>
                <div className="flex items-center justify-between my-2">
                    <div className="col-8 font-weight-normal">مجموع کل</div>
                    <div className="col-4">{toPersianNumber(TotalBasket())} تومان</div>
                </div>
                <div className="flex items-center justify-between my-2">
                    <div className="col-8 font-weight-normal">تخفیف ({state.coupon !== null && state.coupon ? toPersianNumber(state?.coupon?.percent) : 0}%)</div>
                    <div className="col-4">- {toPersianNumber(calculateDiscountAmount(TotalBasket(), (state.coupon !== null && state.coupon !== undefined ? state.coupon.percent : 0)).toFixed(0))} تومان</div>
                </div>
                <div className="flex items-center justify-between my-2">
                    <div >مجموع خرید</div>
                    <div >
                        <strong>{toPersianNumber(amountWithDiscount(TotalBasket(), (state.coupon !== null && state.coupon ? state.coupon.percent : 0)).toFixed(0))} تومان</strong>
                    </div>
                </div>
                <Link href="/checkout" className="block text-center px-4 py-2 my-4 bg-black text-white rounded cursor-pointer w-full">
                    بررسی
                </Link>
            </div>
        </div>

    )
}

export default Details