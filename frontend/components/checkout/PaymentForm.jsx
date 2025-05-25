/* eslint-disable react/prop-types */
import React from 'react'
import useAppContext from '@/context/useAppContext'
import * as API from '@/services/api'

const PaymentForm = ({ gateways }) => {
    const { state, dispatch } = useAppContext()
    const handleChangeMethod = (method) => {
        dispatch({
            type: "UPDATE_PAYMENT_METHOD",
            payload: { method }
        })
    }

    const SubmitOrder = () => {
        API.post('/purchase', { ...state }, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
            .then(response => console.log(response))
            .catch(error => console.log(error.message))
    }

    return (
        <>
            <div className='w-full border border-gray-300 rounded-t-xl py-2 px-4 my-4 bg-black text-white'>
                <h6>پرداخت</h6>
            </div>
            <div className="w-full px-4 pb-4">
                {gateways && gateways.map((gateway, index) => (
                    <div key={index} className="custom-control custom-radio">
                        <input
                            id={gateway.name}
                            name="paymentMethod"
                            type="radio"
                            onChange={() => { handleChangeMethod(gateway.name) }}
                            className="custom-control-input"
                        />
                        <label className="custom-control-label" htmlFor={gateway.name}>
                            {gateway.title}
                        </label>
                    </div>
                ))}
            </div>
            <hr className="mb-4" />
            <button onClick={SubmitOrder} className="w-full py-2 px-4 bg-blue-400 text-white rounded my-4 cursor-pointer hover:bg-blue-300 hover:text-white transition duration-300" type="submit">
                پرداخت
            </button>
        </>
    )
}

export default PaymentForm