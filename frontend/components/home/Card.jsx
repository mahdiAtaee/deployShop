/* eslint-disable react/prop-types */
import React, { useRef } from 'react'
import ProductItem from '../products/List/ProductItem';
import { Navigation, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const Card = ({ products, title }) => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    return (
        <div className='w-full p-4 rounded-2xl'>
            <div className='p-8 border border-gray-200 rounded-r-2xl'>
                <div className='w-full flex items-center justify-between pb-3 font-vazir'>
                    <div>
                        <span className='text-xs md:text-md'>محصولات ما</span>
                        <p className='text-xl md:text-3xl font-iranSans'>
                            <span className='text-dark-green'>{title} </span>
                            محصولات ما
                        </p>
                    </div>
                    <div className='flex items-center'>
                        <button
                            ref={prevRef}
                            className='mr-2 me-2 cursor-pointer'>
                            <i className="fa fa-arrow-right" aria-hidden="true"></i>
                        </button>
                        <button ref={nextRef} className='me-2 cursor-pointer '>
                            <i className="fa fa-arrow-left" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
                <div className='w-full product-card'>
                    <Swiper
                        onBeforeInit={(swiper) => {
                            swiper.params.navigation.prevEl = prevRef.current;
                            swiper.params.navigation.nextEl = nextRef.current;
                        }}
                        height="400px"
                        navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
                        modules={[Navigation, A11y]}
                        spaceBetween={10}
                        slidesPerView={3.5}
                        breakpoints={{
                        0: {
                            slidesPerView: 1,
                            spaceBetween:15
                        },
                        639: {
                            slidesPerView: 3,
                        },
                        865: {
                            slidesPerView: 3
                        },
                        1000: {
                            slidesPerView: 4
                        },
                        1500: {
                            slidesPerView: 5
                        },
                    }}
                    >
                        {products && products.map(product => (
                            <SwiperSlide key={product.id} className='w-full h-full'>
                                <ProductItem {...product} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>

    )
}

export default Card