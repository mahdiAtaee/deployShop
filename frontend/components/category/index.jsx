'use client'
import React, { useState, useEffect } from 'react'
import * as api from '@/services/api'
import { TabGroup } from '@headlessui/react'
import { Tab, TabList, TabPanel, TabPanels } from '@headlessui/react'
import Image from 'next/image';
import Link from 'next/link';
import { IoIosArrowBack } from "react-icons/io";

const index = () => {
    const [categories, setCategories] = useState([])
    useEffect(() => {
        const fetchCategories = async () => {
            const { data } = await api.get('/categories')

            setCategories(data.categories)
        }
        fetchCategories()
    }, []);
    const topLevelCategories = categories.filter(cat => cat.level === 1);

    const renderChildCategories = (parentId, level) => {
        const childCategories = categories.filter(cat => cat.parentId === parentId);

        return childCategories.length > 0 ? (
            <ul className='my-2'>
                {childCategories.map(category => (
                    <li key={category._id} className="py-1 cursor-pointer">
                        <div className="flex items-center">
                            <Image src={category.iconUrl} width={40} height={40} alt='category' />
                            {level > 1 && (
                                <div className="h-6 mr-2"></div>
                            )}
                            <Link href={`/search/${category.slug}`} className="text-[0.7rem] text-gray-600 hover:text-blue-300 font-iranYekan">{category.name.FA}</Link>
                        </div>
                        {renderChildCategories(category._id, level + 1)}
                    </li>
                ))}
            </ul>
        ) : null;
    };

    return (
        <div className='w-dvw h-dvh overflow-x-hidden'>
            <TabGroup defaultIndex={1} vertical={false} className="flex bg-white w-full mt-0.5">
                <TabList className="py-1">
                    {topLevelCategories.map((category) => {
                        return (
                            <Tab key={category._id} className="flex items-center border-b border-l border-b-gray-400 border-l-gray-300 bg-gray-200 p-1 gap-1 outline-0 w-full text-right hover:bg-white">
                                <span
                                    onMouseEnter={(e) => {
                                        let evt = new MouseEvent("click", {
                                            bubbles: true,
                                            cancelable: true,
                                            view: window,
                                        });
                                        e.target.dispatchEvent(evt);
                                        document.activeElement.blur() // جلوگیری از فوکوس خودکار روی دکمه
                                    }}
                                    className="font-vazir text-[0.5rem] h-max min-w-16 py-2 px-2 w-full hover:bg-gray-200 cursor-pointer flex flex-col items-center justify-center gap-2 text-center">
                                    <Image width={20} height={20} src={category.iconUrl} alt='icon' />
                                    {category.name.FA}
                                </span>
                            </Tab>
                        )
                    })}
                </TabList>
                <TabPanels className="pr-4">
                    {topLevelCategories.map(category => (
                        <TabPanel key={category._id} className="p-1 gap-1 transition-all duration-200 ">
                            <Link href={`/landing/${category.slug}`} className='flex items-center text-blue-900 text-[0.7rem] font-iranSans my-2'>
                                همه محصولات {category.name.FA}
                                <IoIosArrowBack width={3} height={3} className='text-xs' />
                            </Link>
                            <div className='flex flex-col mt-4'>
                                {category.slug == 'phone' && (
                                    <Link href="/search/all-mobile-brand" className='text-xs text-gray-900 hover:text-blue-300 font-bold flex items-center-safe gap-1 before:ml-1 before:bg-blue-500 before:inline-block before:w-[1px] before:h-4'>
                                        <span>همه برند های گوشی موبایل</span>
                                        <IoIosArrowBack width={5} height={5} />
                                    </Link>
                                )}
                                {renderChildCategories(category._id, 2)}
                            </div>
                        </TabPanel>
                    ))}
                </TabPanels>
            </TabGroup>
        </div>
    )
}

export default index