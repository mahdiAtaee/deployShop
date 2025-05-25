/* eslint-disable react/prop-types */
import { toPersianNumber } from '@/services/lang'
import React from 'react'

const OrderItem = ({ item }) => {
    return (
        <tr>
            <td>{item.deliveryAddress?.title}</td>
            <td>{toPersianNumber(item.finalPrice)} تومان</td>
            <td>{toPersianNumber(item.created_at)}</td>
            <td>
                <a href="#" className="btn btn-sm btn-pill btn-outline">
                    مشاهده
                </a>
            </td>
        </tr>
    )
}

export default OrderItem