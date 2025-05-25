import React, { useState } from 'react'
import * as API from '@/services/api'
import Image from 'next/image'
import Link from 'next/link'
import { BiLeftArrowAlt } from 'react-icons/bi'
import { toPersianNumber } from '@/services/lang'
import useAppContext from '@/context/useAppContext'

const index = () => {
    const {state} = useAppContext()
    const [orders, setOrders] = useState()
    React.useEffect(() => {
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
            }
        }

        fetchOrders()
    }, [])

    const processStatus = orders && orders.reduce((total, current) => {
        return total + (current.status == 1 ? 1 : 0)
    }, 0)

    const deliveredStatus = orders && orders.reduce((total, current) => {
        return total + (current.status == 3 ? 1 : 0)
    }, 0)

    const refundedStatus = orders && orders.reduce((total, current) => {
        return total + (current.status == 5 ? 1 : 0)
    }, 0)

    console.log(state);
    

    return (
        <div className='w-full p-4'>
            <div className='border border-gray-300 rounded-lg bg-white shadow-md my-4'>
                <div className='flex items-center justify-between h-full p-8'>
                    <h1 className='text-lg font-bold mb-4 relative after:absolute after:top-full after:right-0 after:w-2/3 after:h-[3px] after:bg-red-400'>سفارش های من</h1>
                    <Link href="/dashboard/orders" className='flex items-center gap-1 text-xs text-blue-300 cursor-pointer'>
                        <span>مشاهده همه</span>
                        <BiLeftArrowAlt />
                    </Link>
                </div>
                <div className='flex items-center justify-stretch gap-2 py-4 px-4'>
                    <div className='flex items-center justify-center gap-2 flex-1'>
                        <Image src="/assets/img/status-processing.svg" width={60} height={60} alt='status' />
                        <div className='flex flex-col'>
                            <span className='text-md'>{toPersianNumber(processStatus)} سفارش</span>
                            <span className='text-xs'>در انتظار پرداخت</span>
                        </div>
                    </div>
                    <div className='flex items-center justify-center gap-2 flex-1 border-l border-r border-gray-200'>
                        <Image src="/assets/img/status-delivered.svg" width={60} height={60} alt='status' />
                        <div className='flex flex-col'>
                            <span className='text-md'>{toPersianNumber(deliveredStatus)} سفارش</span>
                            <span className='text-xs'>تحویل شده</span>
                        </div>
                    </div>
                    <div className='flex items-center justify-center gap-2 flex-1'>
                        <Image src="/assets/img/status-returned.svg" width={60} height={60} alt='status' />
                        <div className='flex flex-col'>
                            <span className='text-md'>{toPersianNumber(refundedStatus)} سفارش</span>
                            <span className='text-xs'>مرجوع شده</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='border border-gray-300 rounded-lg bg-white shadow-md my-4'>
                <div className='flex items-center justify-between h-full p-8'>
                    <h1 className='text-lg font-bold mb-4 relative after:absolute after:top-full after:right-0 after:w-2/3 after:h-[3px] after:bg-red-400'>آخرین آدرس ثبت شده</h1>
                    <Link href="/dashboard/addresses" className='flex items-center gap-1 text-xs text-blue-300 cursor-pointer'>
                        <span>مشاهده همه</span>
                        <BiLeftArrowAlt />
                    </Link>
                </div>
                <div className='flex items-center justify-stretch gap-2 py-4 px-4'>
                    <div className='flex-1'>
                        {state?.user?.addresses?.map(address => (
                            <div key={address._id} className='w-full border-b border-gray-300 py-2 my-4'>
                                <span className='text-md lg:!text-lg'>{address.title}</span>
                                <p className='text-xs lg:text-md text-gray-400'>{address.address}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default index