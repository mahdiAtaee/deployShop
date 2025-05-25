/* eslint-disable react/prop-types */
import React, { useLayoutEffect } from 'react'
import Head from 'next/head'
import ShopHeader from '../partials/Header'
import ShopFooter from '../partials/Footer'
import ActiveLink from '../partials/ActiveLink'
import useAppContext from '@/context/useAppContext'
import { useRouter } from 'next/router'
import { check as authCheck } from '@/services/auth'
import { MdOutlineDashboard } from "react-icons/md";
import { CiShoppingBasket } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { GrLocation } from "react-icons/gr";
import { FiLogOut } from "react-icons/fi";

const links = [
  {
    href: '/dashboard',
    label: 'داشبورد',
    icon: <MdOutlineDashboard width={60} height={60} className='text-3xl border border-white rounded-full p-1' />
  },
  {
    href: '/dashboard/orders',
    label: 'سفارشات',
    icon: <CiShoppingBasket width={60} height={60} className='text-3xl border border-white rounded-full p-1' />
  },
  {
    href: '/dashboard/profile',
    label: 'پروفایل',
    icon: <FaRegUser width={60} height={60} className='text-3xl border border-white rounded-full p-1' />
  },
  {
    href: '/dashboard/addresses',
    label: 'آدرس‌ها',
    icon: <GrLocation width={60} height={60} className='text-3xl border border-white rounded-full p-1' />
  }
]

const Dashboard = ({ title, children }) => {
  const router = useRouter()
  const { dispatch } = useAppContext()
  useLayoutEffect(() => {
    authCheck().then(isUserLoggedIn => !isUserLoggedIn ? router.push('/auth/login') : null).catch(error => console.error(error))
  }, [])
 


  const handleLogOut = () => {
    localStorage.removeItem('token')
    dispatch({
      type: 'LOGOUT',
      payload: {}
    })
    router.push('/')
  }

  return (
    <div className='d-flex flex-column bg-gray' dir='rtl'>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
        />
        <meta name="description" content="" />
        <meta name="author" content="mahdi" />
      </Head>
      <ShopHeader />
      <div className='flex gap-4 min-h-dvh'>
        <div className='flex-1/4 bg-black text-white py-4'>
          <div className="w-full flex flex-col gap-2">
            {links.map((link, index) => (
              <ActiveLink key={index} href={link.href} containerClass={`px-3 py-4 rounded-full mx-4 hover:bg-purple-400 ${router.pathname === link.href ? 'bg-purple-700' : ''}`}>
                <div className='flex items-center gap-2 text-xs md:text-[0.9rem]'>
                  {link.icon}
                  {link.label}
                </div>
              </ActiveLink>
            ))}
            <a onClick={handleLogOut} className="text-xs md:text-[0.9rem] list-group-item border-0 flex items-center gap-2 cursor-pointer px-3 py-4 rounded-full mx-4">
              <FiLogOut width={60} height={60} className='text-3xl border border-white rounded-full p-1' />
              <span>خروج</span>
            </a>
          </div>
        </div>
        <div className='flex-3/4'>
          {children}
        </div>
      </div>
      <ShopFooter />
    </div>
  )
}

export default Dashboard