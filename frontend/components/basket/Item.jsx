import useAppContext from '@/context/useAppContext'
import { formatNumberCurrency } from '@/services/discount'
import { toPersianNumber } from '@/services/lang'
import Image from 'next/image'
import React from 'react'

const Item = (product) => {
    const { dispatch } = useAppContext()
    console.log(product);


    const handleChangeCount = (e) => {
        dispatch({
            type: "UPDATE_BASKET_ITEM_COUNT",
            payload: {
                productID: product.productID,
                count: e.target.value
            }
        })
    }

    const handleDeleteItem = (e) => {
        e.preventDefault()
        dispatch({
            type: "REMOVE_BASKET_ITEM",
            payload: {
                productID: product.productID
            }
        })
    }

    return (
        <li className='w-full flex flex-col md:flex-row items-center gap-4 shadow shadow-gray-300 rounded-2xl p-6 my-4'>
            <div className="md:basis-lg flex items-center gap-2">
                <a href="#" className="mr-4">
                    <Image
                        className="rounded"
                        width="100"
                        height="100"
                        src={product.thumbnail}
                        alt="" />
                </a>
                <a href="#" className="text-dark">{product.title}</a>
            </div>
            <strong className='grow'>{toPersianNumber(formatNumberCurrency(product.discountedPrice == 0 ? product.price : product.discountedPrice))} تومان</strong>
            <input type="number" className="outline-0" min={1} max={10} onChange={handleChangeCount} defaultValue={product.count} />
            <strong className='grow'>{toPersianNumber(formatNumberCurrency(product.discountedPrice ? product.discountedPrice * product.count : product.price * product.count))} تومان</strong>
            <a onClick={handleDeleteItem} className="basis-5 cursor-pointer"><i className="vl-cross-circle"></i></a>
        </li>
    )
}

export default Item