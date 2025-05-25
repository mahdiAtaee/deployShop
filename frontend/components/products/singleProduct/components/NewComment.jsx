'use client';
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { BiSolidRightArrowAlt } from 'react-icons/bi'
import ReactStars from 'react-stars'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { applyCommentSchema } from "@/components/constant/formValidation/schema/Comment";
import * as API from '@/services/api'
import { useRouter } from 'next/router';
import Link from 'next/link';

//modal style
const customStyles = {
    content: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '1000'
    },
};


const NewComment = ({ modalIsOpen, closeModal }) => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
    const [score, setScore] = useState(0)
    const router = useRouter()
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            setIsUserLoggedIn(true)
        }
    }, [])
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(applyCommentSchema),
    });

    const onSubmit = async (data) => {
        const { id } = router.query
        const formData = new FormData()
        formData.append("title", data.title)
        formData.append('body', data.comment)
        formData.append('product', id)
        formData.append('rate', score)

        await API.post('/comments', formData, {
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
    };

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"

        >
            <div className='w-full' dir='rtl'>
                <button onClick={closeModal} className='cursor-pointer text-xl flex items-center justify-center gap-2'>
                    <BiSolidRightArrowAlt />
                    <span>ثبت دیدگاه</span>
                </button>
            </div>
            {
                isUserLoggedIn
                    ? (<Link href="/auth/login" className='py-2 px-4 bg-black text-white rounded mx-auto '>برای ثبت نظر باید وارد حساب خود شوید</Link>)
                    : (<form dir='rtl' onSubmit={handleSubmit(onSubmit)}>
                        <div className='my-6'>
                            <span>امتیاز خود به این محصول را از ۰ تا ۵ ستاره انتخاب نمایید</span>
                            <ReactStars half value={score} onChange={(value) => setScore(value)} edit={true} size={30} />
                            <p id="helper-text-explanation" className="mt-2 text-xs text-gray-500 dark:text-gray-400">تغییر ندادن ستاره ها به معنای امتیاز ۰ است.</p>
                        </div >
                        <div className='my-6'>
                            <label htmlFor="helper-text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">عنوان دیدگاه</label>
                            <input name='title' type="text" id="helper-text" aria-describedby="helper-text-explanation" className={`${errors.title ? 'outline-red-400' : 'outline-green-300'} bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} placeholder="عنوان" {...register("title")} />
                            {errors.title
                                ? <p className="mt-2 text-xs text-red-500 dark:text-red-400">*{errors.title.message}</p>
                                : <p id="helper-text-explanation" className="mt-2 text-xs text-gray-500 dark:text-gray-400">عنوان دیدگاه میتواند بین ۰ تا ۶۰ کاراکتر باشد.</p>
                            }
                        </div>
                        <div>
                            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">دیدگاه شما</label>
                            <textarea name='body' {...register('comment')} id="message" rows="4" className={`${errors.comment ? 'outline-red-400' : 'outline-green-300'} bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} placeholder="دیدگاه خود را اینجا بنویسد ..."> </textarea>
                            {errors.comment
                                ? <p className="mt-2 text-xs text-red-500 dark:text-red-400">*{errors.comment.message}</p>
                                : <p id="helper-text-explanation" className="mt-2 text-xs text-gray-500 dark:text-gray-400">لطفا دیدگاه خود را واضح بنویسید.</p>
                            }
                        </div>
                        <button type='submit' className='w-full my-4 bg-blue-400 text-white rounded py-2 px-6 cursor-pointer'>ثبت دیدگاه</button>
                    </form >)

            }

        </Modal >
    )
}

export default NewComment