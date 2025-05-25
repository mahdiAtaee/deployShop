/* eslint-disable react/prop-types */
import React from 'react'
import { FaFireFlameCurved } from "react-icons/fa6";
import Image from 'next/image';


const Latests = ({ products }) => {
  return (
    <>
      <section className="mt-4 p-md-4">
        <div className='w-[200%] overflow-x-clip lg:w-[98%] mx-auto rounded-xl border border-gray-300'>
          <h2 className='px-6 w-full leading-10 text-xl my-4 flex items-center justify-start lg:justify-center gap-2'>
            <FaFireFlameCurved color='orange' />
            <span>جدیدترین محصولات</span>
          </h2>
          <div className='w-full h-max grid grid-cols-[repeat(4,minmax(250px,1fr))] grid-rows-2 gap-4 my-8'>
            {products.map((product, index) => (
              <div key={product.id} className='w-full px-4 flex gap-4 min-h-32'>
                <div className='w-24 h-auto relative basis-full'>
                  <Image src={product.thumbnail} fill alt='' className='object-contain' />
                </div>
                <div className='flex items-center gap-3 border-b-2 border-gray-200'>
                  <span className='text-3xl text-blue-500 font-bold font-sans'>{index}</span>
                  <p className='text-md text-gray-600'>{product.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className='mt-md-0 p-md-4'>
        <div className='small-banner my-2'>
          <Image src="/assets/img/banner/banner-5.gif" className='object-cover' fill alt='banner' />
        </div>
        <div className='small-banner'>
          <Image src="/assets/img/banner/banner-6.gif" className='object-cover' fill alt='banner' />
        </div>
      </section>
    </>

  )
}

export default Latests