/* eslint-disable react/prop-types */
import React from 'react'

const Attributes = ({ attributes }) => {
    return (
        <div>
            {attributes.map((attribute, index) => (
                <div key={index} className='flex flex-col md:flex-row items-start my-6'>
                    <h5 className='flex-1/3 text-xl text-blue-950 my-4 md:m-0'>{attribute.title}</h5>

                    <div className="w-full px-2 md:flex-2/3 md:px-8" >
                        {attribute.attributes.map((attr) => (
                            <ul key={index}>
                                <li className='flex items-stretch border-b md:border-0 border-gray-300 text-xs md:text-md'>
                                    <div className='flex-1/4 text-gray-500 bg-gray-200 md:bg-transparent w-full py-4 px-2'>
                                        {attr.title}
                                    </div>
                                    <div className='flex-3/4 md:border-b border-gray-100 py-4 px-2'>
                                        {attr.value}
                                    </div>
                                </li>
                            </ul>
                        ))}
                    </div>
                </div>

            ))}
        </div>

    )
}

export default Attributes