import { get } from '@/services/api';
import React, { useState, useEffect } from 'react';
import { BiCategoryAlt } from "react-icons/bi";
import { AiOutlineFire } from "react-icons/ai";
import { CiPercent } from "react-icons/ci";
import { TiHeartFullOutline } from "react-icons/ti";
import Link from 'next/link';
import CategoryMenu from './Category';
import { TabGroup } from '@headlessui/react'

const Menu = () => {
    const [categories, setCategories] = useState([])
    useEffect(() => {
        const fetchCategories = async () => {
            const { data } = await get('/categories')
            setCategories(data.categories)
        }
        fetchCategories()
    }, []);

    

    return (
        <header className="hidden md:block w-screen h-16 border-b border-gray-300">
            <nav className='flex items-center h-full gap-4 px-8 font-vazir'>
                <ul className="group flex items-center h-full relative">
                    <li className='h-full cursor-pointer !text-lg font-bold flex gap-1 items-center nav-hover-btn'>
                        <BiCategoryAlt />
                        <span>دسته بندی کالاها | </span>
                    </li>
                    <TabGroup defaultIndex={0} vertical={false} className="group-hover:flex bg-white w-max rounded-b-lg mt-0.5 shadow absolute top-full right-0 z-30 hidden">
                        <CategoryMenu categories={categories} />
                    </TabGroup>
                </ul>
                <ul className="flex items-center gap-2 h-full">
                    <Link
                        href="/products"
                        className="h-full text-[0.9rem] text-gray-600 font-iranSans flex items-center gap-1 nav-hover-btn"
                    >
                        <TiHeartFullOutline />
                        <span>همه محصولات</span>
                    </Link>
                    <Link
                        href="/products"
                        className="h-full text-[0.9rem] text-gray-600 font-iranSans flex items-center gap-1 nav-hover-btn"
                    >
                        <AiOutlineFire />
                        <span>پرفروش ترین ها</span>
                    </Link>
                    <Link
                        href="/products"
                        className="h-full text-[0.9rem] text-gray-600 font-iranSans flex items-center gap-1 nav-hover-btn"
                    >
                        <CiPercent />
                        <span>شگفت انگیزها</span>
                    </Link>
                </ul>

            </nav>
        </header>
    );
};


export default Menu;