import React from 'react'
import Menu from './Menu'
import useAppContext from '@/context/useAppContext'
import Link from 'next/link'
import Image from 'next/image'
import { HiOutlineLogin } from "react-icons/hi";
import { SlBasket } from "react-icons/sl";
import { CiSearch } from "react-icons/ci";
const Header = () => {
    const { state } = useAppContext()


    return (
        <>
            <section className="bg-gray">
                <div className="w-screen h-16 px-8">
                    <div className="flex items-center justify-between gap-4 h-full">
                        <div className='flex items-center gap-8 grow'>
                            <Link href="/">
                                <Image src="/assets/img/logo.png" width={120} height={40} alt='BAZAREIO' className='hidden md:block' />
                            </Link>
                            <div className='relative w-full rounded-lg bg-gray-300 py-1.5 px-8 min-h-10 '>
                                <CiSearch className='absolute top-1/2 right-2.5 -translate-y-1/2 text-xl' />
                                <input type='search' placeholder='جستجو' className='w-full h-full outline-0 text-xs' />
                            </div>
                        </div>
                        <div className="hidden md:flex items-center justify-end grow">
                            {!state.user.id ? (
                                <ul className="flex items-center gap-4 mx-4">
                                    <Link href="/auth/login" className="flex items-center gap-2 text-dark text-iranSans border py-1.5 px-2 rounded-lg border-gray-400">
                                        <HiOutlineLogin />
                                        <span>ورود | ثبت نام</span>
                                    </Link>
                                </ul>
                            ) : (
                                <div className="flex ml-4 relative group">
                                    <button
                                        className="border-0 flex items-center gap-2 font-iranSans"
                                        type="button"
                                    >
                                        <div className='flex flex-col text-left'>
                                            <span>{state && state.user.firstName}</span>
                                            <span className='text-xs text-gray-400'>{state && state.user.email}</span>
                                        </div>
                                        <Image className="mb-1 mr-1 rounded" src={state && state.user.avatar} width={30} height={30} alt={state && state.user.firstName} />
                                    </button>
                                    <ul className='hidden group-hover:block absolute top-full right-0 shadow-xl shadow-blue-100 border border-blue-50 w-max py-2 rounded-l-xl rounded-br-xl'>
                                        <li className='hover:bg-blue-50 w-full block py-2 px-8 transition-colors duration-300'>
                                            <Link className="" href="/dashboard">
                                                داشبورد
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            )}

                            <Link href='/basket' className="text-decoration-none flex items-baseline text-xl">
                                <span className='text-xs'>{state?.basket.length}</span>
                                <SlBasket width={25} height={25} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            <Menu />
        </>
    )
}

export default Header