import React, { useEffect, useState } from 'react'
import * as API from '@/services/api'
import Error from 'next/error'
import OrderItem from './OrderItem'



const OrdersList = () => {
    const [error, setError] = useState(false)
    const [orders, setOrders] = useState([])
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const result = await API.get('/orders', {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                })
                console.log(result.data);

                setOrders(result.data)
            } catch (error) {
                console.log(error);
                setError(true)
            }
        }

        fetchOrders()
    }, [])



    return (

        <>
            {error && (<Error title='مشکلی در بارگذاری سفارشات رخ داده است. لطفا بعدا دوباره تلاش کنید.'> </Error>)}
            <div className="table-responsive">
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>آدرس</th>
                            <th>مبلغ</th>
                            <th>تاریخ ثبت سفارش</th>
                            <th>عملیات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders && orders.map(order => (
                            <OrderItem item={order} key={order.id} />
                        ))}
                    </tbody>
                </table>
            </div>

        </>
    )
}

export default OrdersList