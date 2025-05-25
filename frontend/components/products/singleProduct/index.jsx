/* eslint-disable react/prop-types */
import React from 'react'
import Gallery from './components/Gallery'
import Details from './components/Details'
import Description from './components/Description'
import Attributes from './components/Attributes'
import Comments from './components/Comments'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import Card from '@/components/home/Card'


const SingleProduct = ({ product, comments, relatedProducts }) => {
    return (
        <section className="w-dvw min-h-dvh overflow-x-hidden">
            <div className='w-screen grid grid-cols-1 gird-rows-2 md:grid-cols-2 md:grid-rows-1 gap-8 p-4'>
                <div className='w-full'>
                    {product &&
                        <Gallery images={product.gallery} />
                    }
                </div>
                <div className='w-full p-4'>
                    {product &&
                        <Details product={product} />
                    }
                </div>
            </div>
            <div className="w-screen my-6">
                <TabGroup>
                    <TabList className="border-b border-gray-300 flex items-stretch min-h-16 px-4">
                        <Tab className="cursor-pointer outline-0 basis-24 relative">
                            {({ selected }) => (
                                <>
                                    <span className={`${selected ? "text-red-400 font-sans font-bold" : ""}`}>معرفی</span>
                                    <div>
                                        {selected && (
                                            <span className='w-full h-1 absolute bottom-0 left-0 right-0 rounded-t-2xl bg-red-400' />
                                        )}
                                    </div>
                                </>
                            )}
                        </Tab>
                        <Tab className="cursor-pointer outline-0 basis-24 relative">
                            {({ selected }) => (
                                <>
                                    <span className={`${selected ? "text-red-400 font-sans font-bold" : ""}`}>مشخصات</span>
                                    <div>
                                        {selected && (
                                            <span className='w-full h-1 absolute bottom-0 left-0 right-0 rounded-t-2xl bg-red-400' />
                                        )}
                                    </div>
                                </>
                            )}
                        </Tab>
                        <Tab className="cursor-pointer outline-0 basis-24 relative">
                            {({ selected }) => (
                                <>
                                    <span className={`${selected ? "text-red-400 font-sans font-bold" : ""}`}>دیدگاه ها</span>
                                    <div>
                                        {selected && (
                                            <span className='w-full h-1 absolute bottom-0 left-0 right-0 rounded-t-2xl bg-red-400' />
                                        )}
                                    </div>
                                </>
                            )}
                        </Tab>
                    </TabList>
                    {product &&
                        <TabPanels className="p-4">
                            <TabPanel>
                                <Description describe={product.description} />
                            </TabPanel>
                            <TabPanel>
                                <Attributes attributes={product.attributes} />
                            </TabPanel>
                            <TabPanel>
                                <Comments comments={comments} score={product.totalScore} />
                            </TabPanel>
                        </TabPanels>
                    }
                </TabGroup>
            </div>
            <div className='w-screen my-6'>
                {relatedProducts.length > 0 &&
                    <Card products={relatedProducts.products} title={`کالاهای مشابه در دسته بندی ${relatedProducts.category.name.FA}`} />}
            </div>
        </section>
    )
}

export default SingleProduct