/* eslint-disable react/prop-types */
import useAppContext from '@/context/useAppContext'
import React, { useState } from 'react'
import { toPersianNumber } from '@/services/lang'
import { BiPlus, BiMinus, BiSolidStar } from 'react-icons/bi'
import { formatNumberCurrency } from '@/services/discount'
import useProductPrice from '../../useProductPrice'

const Details = ({ product }) => {
    const [itemCount, setItemCount] = useState(1)
    const [variations, setVariations] = useState([])
    const [colorSelected, setColorSelected] = useState({
        value: '',
        title: ''
    })
    const { dispatch } = useAppContext()
    const price = useProductPrice(product, variations)


    const addVariation = (e, title, valueTitle = "") => {
        const selectedVariation = e.target.value;

        setColorSelected({ value: selectedVariation, title: valueTitle });

        setVariations(prevVariations => {
            const updated = [...prevVariations];
            const existingIndex = updated.findIndex(item => Object.keys(item)[0] === title);

            const newItem = { [title]: selectedVariation };

            if (existingIndex !== -1) {
                updated[existingIndex] = newItem;
            } else {
                updated.push(newItem);
            }

            return updated;
        });
    };

    const AddToBasket = () => {
        dispatch({
            type: "ADD_TO_BASKET",
            payload: {
                productID: product.id,
                price: price.main,
                discountedPrice: price.discounted,
                title: product.title,
                thumbnail: product.thumbnail,
                count: itemCount,
                variation: variations
            }
        })
    }

    return (
        <>
            {/* title product */}
            <h3 className="leading-10 md:text-xl my-4 font-extrabold">{product.title}</h3>

            {/* price section */}
            <div className="price mb-4">
                {price.discounted != 0 ? (
                    <>
                        <del className="text-muted mr-2">
                            <span className="text-lg">{toPersianNumber(formatNumberCurrency(price.main))} تومان</span>
                        </del>
                        <span className="md:text-xl">{toPersianNumber(formatNumberCurrency(price.discounted))} تومان</span>
                    </>
                ) : (
                    <span className="md:text-xl">{toPersianNumber(formatNumberCurrency(price.main))} تومان</span>
                )}
            </div>

            <div>
                <p className='text-red-400 text-xs font-bold font-sans'>+ تعداد {product.stock} در انبار موجود است</p>
                <div className='flex items-center gap-4 my-4'>
                    <span className='flex gap-1 items-center my-2 text-md'>
                        <BiSolidStar color='orange' />
                        {toPersianNumber(product.totalScore)}
                    </span>
                    <span className='flex gap-1 items-center rounded-lg bg-gray-200 text-black py-1 px-2 text-xs'>
                        <span>{toPersianNumber(product.commentCount)}</span>
                        <span>دیدگاه</span>
                    </span>
                </div>
            </div>

            {/* variations and Cart */}
            <form className="form-inline my-lg-5 mb-4">
                {
                    product.variations.map((variation, index) => (
                        <div key={index} className="mx-2 mb-4 w-full my-6 block">
                            {variation?.type === "color" ? (
                                <>
                                    <p className='text-xl font-iranYekan my-4'>رنگ انتخاب شده:‌ {colorSelected.title}</p>
                                    <div className='flex items-center gap-2 w-full'>
                                        {variation?.items?.map((item) => (
                                            <div key={item.title} className={`relative w-10 h-10 rounded-full flex items-center justify-center ${colorSelected.value == item.value ? "border-blue-500 p-[3px] border-3" : 'border border-blue-50'}`}>
                                                <input
                                                    value={item.value}
                                                    style={{ backgroundColor: item.value }}
                                                    onClick={(e) => addVariation(e, variation.name, item.title)}
                                                    className="w-full h-full rounded-full cursor-pointer text-transparent outline-0 disabled" />
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <select className="border border-gray-400 py-2 px-6 rounded text-gray-600 outline-0" onChange={e => addVariation(e, variation.title)}>
                                    <option selected value={null}>{variation.name}</option>
                                    {variation.items.map((item, index) => (
                                        <option value={item.value} key={`item-${index}`}>{item.title}</option>
                                    ))}
                                </select>
                            )}

                        </div>
                    ))
                }

                <div className='w-full my-6 flex flex-col md:flex-row items-center justify-between gap-2'>
                    <div className='w-full flex items-center min-h-10'>
                        <span className='flex-[3]'>تعداد (انتخاب کنید)</span>
                        <button
                            onClick={(e) => {
                                e.preventDefault()
                                if (itemCount > 1) {
                                    setItemCount(prev => (prev - 1))
                                }
                            }}
                            className='flex-1 h-full cursor-pointer border py-2 rounded-r border-gray-400 flex items-center justify-center text-2xl'>
                            <BiMinus />
                        </button>
                        <input
                            type="text"
                            className="flex-1 outline-0 text-center border border-gray-400 py-2 border-r-0 border-l-0"
                            placeholder={1}
                            style={{ width: "inherit" }}
                            value={itemCount}
                            onChange={() => { setItemCount(prev => (prev + 1)) }}
                        />
                        <button
                            onClick={(e) => {
                                e.preventDefault()
                                if (itemCount < product.stock) {
                                    setItemCount(prev => prev + 1)
                                }
                            }}
                            className='flex-1 cursor-pointer border rounded-l py-2 border-gray-400 flex items-center justify-center text-2xl'>
                            <BiPlus />
                        </button>
                    </div>
                    <button type="button" onClick={AddToBasket} className="w-full py-2 px-4 bg-black text-white flex items-center justify-center gap-2 rounded-lg cursor-pointer">
                        <i className="fa fa-shopping-cart pr-3" />
                        افزودن به سبد خرید
                    </button>
                </div>
            </form >
        </>
    )
}

export default Details