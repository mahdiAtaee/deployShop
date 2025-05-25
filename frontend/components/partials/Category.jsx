/* eslint-disable react/prop-types */
import React from 'react';
import { Tab, TabList, TabPanel, TabPanels } from '@headlessui/react'
import Image from 'next/image';
import Link from 'next/link';
import { IoIosArrowBack } from "react-icons/io";


const CategoryMenu = ({ categories }) => {
  // دسته‌های سطح ۱ (parentId: null)
  const topLevelCategories = categories.filter(cat => cat.level === 1);

  // تابع بازگشتی برای نمایش دسته‌های فرزند
  const renderChildCategories = (parentId, level) => {
    const childCategories = categories.filter(cat => cat.parentId === parentId);

    return childCategories.length > 0 ? (
      <ul className='my-2'>
        {childCategories.map(category => (
          <li key={category._id} className="py-1 cursor-pointer">
            <div className="flex items-center">
              {level > 1 && (
                <div className="h-6 mr-2"></div>
              )}
              <Link href={`/search/${category.slug}`} className="text-md text-gray-600 hover:text-blue-300 font-iranYekan">{category.name.FA}</Link>
            </div>
            {renderChildCategories(category._id, level + 1)}
          </li>
        ))}
      </ul>
    ) : null;
  };

  return (
    <>
      <TabList className="min-w-48 py-1">
        {topLevelCategories.map((category) => {
          return (
            <Tab key={category._id} className="flex p-1 gap-1 outline-0 w-full text-right">
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
                className="font-vazir text-[0.9rem] h-max min-w-16 py-4 px-2 w-full hover:bg-gray-200 cursor-pointer flex item-center justify-start gap-2">
                <Image width={20} height={20} src={category.iconUrl} alt='icon' />
                {category.name.FA}
              </span>
            </Tab>
          )
        })}
      </TabList>
      <TabPanels className="min-w-64 pr-4">
        {topLevelCategories.map(category => (
          <TabPanel key={category._id} className="p-1 gap-1 transition-all duration-200 ">
            <Link href={`/landing/${category.slug}`} className='flex items-center text-blue-900 text-md font-iranSans my-6'>
              همه محصولات {category.name.FA}
              <IoIosArrowBack width={3} height={3} className='text-xs' />
            </Link>
            <div className='flex flex-col'>
              {category.slug == 'phone' && (
                <Link href="/search/all-mobile-brand" className='text-md text-gray-900 hover:text-blue-300 font-bold flex items-center-safe gap-1 before:ml-1 before:bg-blue-500 before:inline-block before:w-[1px] before:h-4'>
                  <span>همه برند های گوشی موبایل</span>
                  <IoIosArrowBack width={5} height={5} />
                </Link>
              )}
              {renderChildCategories(category._id, 2)}
            </div>
          </TabPanel>
        ))}
      </TabPanels>
    </>
  );
};

export default CategoryMenu;