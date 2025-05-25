import React, { useState } from 'react'
import * as API from '@/services/api'
import Notify from '../partials/Notification/Notify'
import useAppContext from '@/context/useAppContext'

const Coupon = () => {
    const [couponCode, setCouponCode] = useState()
    const [applyResult, setApplyResult] = useState({
        status: null,
        message: ''
    })
    const { dispatch } = useAppContext()

    const applyCoupon = (e) => {
        e.preventDefault()

        if (couponCode === '' && couponCode === undefined && couponCode === null) {
            return false
        }

        API.post('/coupons/validation', { couponCode })
            .then(response => {
                setApplyResult({
                    status: true,
                    message: response.data.message
                })
                dispatch({
                    type: "UPDATE_COUPON",
                    payload: { ...response.data.coupon }
                })
            })
            .catch(error => {
                setApplyResult({
                    status: false,
                    message: error.response.data.message
                })
            })

    }

    return (
        <div className="p-6">
            <h6>تخفیف کوپن</h6>
            <p className="text-xs text-gray-500">لطفا کد تخفیف خود را وارد کنید</p>
            {applyResult.status === false && <Notify message={applyResult.message} status={false} />}
            {applyResult.status === true && <Notify message={applyResult.message} status={true} />}
            <form className="flex flex-col mt-3 mb-4">
                <input
                    type="text"
                    className="py-2 px-4 border border-gray-300 rounded outline-0"
                    placeholder="کد کوپن"
                    value={couponCode} onChange={(e) => setCouponCode(e.target.value.trim())}
                />
                <button type="submit" onClick={applyCoupon} className="px-4 py-2 my-4 bg-black text-white rounded cursor-pointer">
                    اعمال کوپن
                </button>
            </form>
        </div>

    )
}

export default Coupon