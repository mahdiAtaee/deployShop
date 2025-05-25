/* eslint-disable react/prop-types */
import { toPersianNumber } from '@/services/lang'
import Image from 'next/image'
import React, { useState } from 'react'
import ReactStars from 'react-stars'
import Modal from 'react-modal';
import NewComment from './NewComment';
Modal.setAppElement('body');

const Comments = ({ comments, score }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const handleOpenModal = () => {
        setModalIsOpen(true)
    }
    const onClose = () => {
        setModalIsOpen(false)
    }

    return (
        <div>
            <div className="comments flex flex-col md:flex-row items-start gap-8">
                <div className='text-right flex flex-col items-start'>
                    <h2 className=''>
                        <span className='text-xl md:text-2xl ml-1'>{toPersianNumber(score)}</span>
                        <span className='text-xs'>از ۵</span>
                    </h2>
                    <ReactStars half value={score} edit={false} size={20} />
                    <p className='text-xs'>شما هم درباره این کالا دیدگاه ثبت کنید</p>
                    <button onClick={handleOpenModal} className="py-2 px-4 my-4 rounded border border-blue-400 text-blue-400 cursor-pointer w-full">ثبت دیدگاه</button>
                    <NewComment closeModal={onClose} modalIsOpen={modalIsOpen} />
                </div>
                <ul>
                    {comments.map(comment => (
                        <li key={comment.id} className="comment my-4 border-b border-gray-200">
                            <article className="comment-body">
                                <footer className="comment-meta">
                                    <div className="comment-author flex items-center gap-1">
                                        <Image src={comment.user.avatar} width={30} height={30} className='rounded-full' />
                                        <div className='flex items-center text-xs gap-6'>
                                            <b className="fn">
                                                <a href="#" rel="external nofollow" className="url">
                                                    {`${comment.user.firstName} ${comment.user.lastName}`}
                                                </a>
                                            </b>
                                            {comment.isBuyer && (
                                                <span className='py-1 px-2 text-xs bg-green-200 rounded'>خریدار</span>
                                            )}
                                            <time>{toPersianNumber(comment.createdAt)}</time>
                                        </div>
                                    </div>
                                </footer>
                                <div className="comment-content pr-18">
                                    <p className='my-4 text-md text-gray-700'>
                                        {comment.body}
                                    </p>
                                </div>
                            </article>
                        </li>
                    ))}
                </ul>
            </div>

        </div>

    )
}

export default Comments