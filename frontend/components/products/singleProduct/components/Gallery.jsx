/* eslint-disable react/prop-types */
import React from 'react'
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Image from 'next/image';

const Gallery = ({ images }) => {
    images = [...images, ...images, ...images]
    return (
        <Swiper
            modules={[Navigation, Pagination, Autoplay, A11y]}
            spaceBetween={50}
            slidesPerView={1}
            style={{ height: "540px" }}
            navigation
            autoplay
            pagination={{ clickable: true }}
        >
            {images.map((image, index) => (
                <SwiperSlide key={index}>
                    <Image
                        fill
                        className='object-cover h-full'
                        src={image}
                        alt="card image"
                    />
                </SwiperSlide>
            ))}
            ...
        </Swiper>
    )
}

export default Gallery