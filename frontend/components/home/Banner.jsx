import React from 'react'
import Image from 'next/image'

const Banner = () => {
    return (
        <section className='w-[96%] mx-auto grid gap-2 grid-cols-1 md:grid-cols-2 grid-rows-1 mt-md-0 p-md-4'>
            <div className='small-banner'>
                <Image src="/assets/img/banner/small-banner-1.webp" className='object-cover' fill alt='banner' />
            </div>
            <div className='small-banner'>
                <Image src="/assets/img/banner/small-banner-2.webp" className='object-cover' fill alt='banner' />
            </div>
        </section>
    )
}

export default Banner