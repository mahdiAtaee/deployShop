import React from 'react'
import Link from 'next/link';
import { RiHomeSmileFill } from "react-icons/ri";
import { BiCategoryAlt } from "react-icons/bi";
import { SlBasket } from "react-icons/sl";
import { FaRegUser } from "react-icons/fa";
import { useRouter } from 'next/router';


const MobileMenu = () => {
  const menuItems = [
    { title: 'خانه', icon: <RiHomeSmileFill />, route: "/" },
    { title: 'دسته بندی', icon: <BiCategoryAlt />, route: "/category" },
    { title: 'سبد خرید', icon: <SlBasket />, route: "/basket" },
    { title: 'حساب کاربری', icon: <FaRegUser />, route: "dashboard" }]


  const router = useRouter()

  return (
    <nav className='md:hidden w-full h-16 border-t border-gray-300 py-2 fixed bottom-0 right-0 left-0 z-40 bg-white'>
      <ul className='flex items-center justify-around'>
        {menuItems.map((item, index) => (
          <Link href={item.route} key={index}>
            <li className={`flex flex-col items-center gap-1 font-iranSans text-2xl ${router.pathname == item.route ? "text-blue-500" : "text-gray-500"}`}>
              {item.icon}
              <span className='text-[0.6rem]'>{item.title}</span>
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  )
}

export default MobileMenu