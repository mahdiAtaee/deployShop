import React from 'react'
import Image from 'next/image'

const SmallBanner = () => {
    return (
        <section className='w-[96%] mx-auto grid gap-2 grid-cols-1 md:grid-cols-4 grid-rows-4 md:grid-rows-1 mt-md-0 p-md-4'>
            <div className=''>
                <div className='small-banner'>
                    <Image src="/assets/img/banner/small-banner-3.webp" className='object-cover' fill alt='banner' />
                </div>
            </div>
            <div className=''>
                <div className='small-banner'>
                    <Image src="/assets/img/banner/small-banner-4.webp" className='object-cover' fill alt='banner' />
                </div>
            </div>
            <div className=''>
                <div className='small-banner'>
                    <Image src="/assets/img/banner/small-banner-5.webp" className='object-cover' fill alt='banner' />
                </div>
            </div>
            <div className=''>
                <div className='small-banner'>
                    <Image src="/assets/img/banner/small-banner-6.webp" className='object-cover' fill alt='banner' />
                </div>
            </div>
        </section>
    )
}

export default SmallBanner