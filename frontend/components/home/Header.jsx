/* eslint-disable react/prop-types */
import React, { useRef, useEffect } from 'react'
import { Autoplay, A11y, EffectFade, Controller, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';

const Header = () => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const totalBannerCount = [1, 2, 3, 4]
    const totalCategoryBannerCount = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const bannerSrc = (index) => `/assets/img/banner/banner-${index}.webp`;
    const categoryBannerSrc = (index) => `/assets/img/category-product/banner_${index}.webp`;
    const [swiperInstance, setSwiperInstance] = React.useState(null);
    useEffect(() => {
        if (swiperInstance && prevRef.current && nextRef.current) {
            swiperInstance.params.navigation.prevEl = prevRef.current;
            swiperInstance.params.navigation.nextEl = nextRef.current;
            swiperInstance.navigation.destroy(); // Clean up previous navigation
            swiperInstance.navigation.init();    // Initialize new navigation
            swiperInstance.navigation.update();  // Update swiper
        }
    }, [swiperInstance]);


    return (
        <section className="w-dvw pt-5">
            <div className="relative" dir='rtl'>
                <Swiper
                    dir='rtl'
                    onSwiper={setSwiperInstance}
                    modules={[A11y, Autoplay, EffectFade, Navigation, Pagination]}
                    spaceBetween={0}
                    slidesPerView={1}
                    autoplay
                    pagination={{
                        el: ".swiper-pagination", // Use a valid DOM element here
                        type: "bullets",
                        clickable: true,
                        bulletClass: "pagination-bullet",
                        bulletActiveClass: "pagination-bullet-active",
                    }}
                    breakpoints={{
                        0: {
                            slidesPerView: 1.1,
                            spaceBetween:2,
                        },
                        639: {
                            slidesPerView: 1,
                        },
                    }}
                >
                    {totalBannerCount.map((_, index) => (
                        <SwiperSlide key={index} className='rounded-xl md:rounded-none'>
                            <img src={bannerSrc(index + 1)} className='rounded-xl md:rounded-none object-cover min-h-48' />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className='flex items-center max-w-xs absolute bottom-2 right-0 md:bottom-16 md:right-10 z-20'>
                    <button ref={prevRef} className='border rounded-full border-gray-300 bg-white cursor-pointer  hover:bg-blue-50 hover:text-black text-gray-800 transition-colors duration-100 ease-in mr-2 flex items-center justify-center w-4 h-4 md:w-9 md:h-9 text-[0.6rem] md:text-xl'>
                        <i className="fa fa-arrow-right" aria-hidden="true"></i>
                    </button>
                    <button ref={nextRef} className='border rounded-full border-gray-300 bg-white cursor-pointer hover:bg-blue-50 hover:text-black text-gray-800 transition-colors duration-100 ease-in me-2 flex items-center justify-center w-4 h-4 md:w-9 md:h-9 text-[0.6rem] md:text-xl'>
                        <i className="fa fa-arrow-left" aria-hidden="true"></i>
                    </button>
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-6 z-20">
                    <div className="swiper-pagination w-full h-full"></div>
                </div>
            </div>
            <div className="my-12 w-[80%] mx-auto bg-gray-200 rounded-2xl p-8">
                <Swiper
                    modules={[A11y, Autoplay, EffectFade, Controller, Navigation]}
                    spaceBetween={50}
                    slidesPerView={6}
                    autoplay
                    controller
                    breakpoints={{
                        0: {
                            slidesPerView: 2,
                            spaceBetween:15
                        },
                        639: {
                            slidesPerView: 3,
                        },
                        865: {
                            slidesPerView: 4
                        },
                        1000: {
                            slidesPerView: 7
                        },
                        1500: {
                            slidesPerView: 7
                        },
                    }}
                >
                    {totalCategoryBannerCount.map((_, index) => (
                        <SwiperSlide key={index}>
                            <Image
                                width={130}
                                height={130}
                                src={categoryBannerSrc(index + 1)}
                                className='img-slider'
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    )
}

export default Header