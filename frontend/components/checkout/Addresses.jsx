'use client'
/* eslint-disable react/prop-types */
import React from 'react'
import AddressForm from './AddressForm'
import useAppContext from '@/context/useAppContext'
import Modal from 'react-modal';
import AddressList from './AddressList';
Modal.setAppElement('body');

const Addresses = ({ addresses }) => {
    const [modalIsOpen, setModalIsOpen] = React.useState(false)
    const handleOpenModal = () => {
        setModalIsOpen(true)
    }
    const onClose = () => {
        setModalIsOpen(false)
    }

    const { dispatch } = useAppContext()
    const handleChangeAddress = (address) => {
        dispatch({
            type: "UPDATE_DELIVERY_ADDRESS",
            payload: { address }
        })
    }
    return (
        <>
            {addresses.length > 0 &&
                <>
                    <button onClick={handleOpenModal} className="text-xs md:text-lg py-2 px-4 bg-blue-300 text-blue-50 rounded cursor-pointer">انتخاب آدرس ارسال</button>
                    <AddressList closeModal={onClose} modalIsOpen={modalIsOpen} addresses={addresses} handleChangeAddress={handleChangeAddress} />
                </>
            }
            <div>
                <div className='w-full border border-gray-300 rounded-t-xl py-2 px-4 my-4 bg-black text-white'>
                    <h6 className='text-xs md:text-lg'>اضافه کردن آدرس جدید</h6>
                </div>
                <div className="w-full px-4">
                    <AddressForm />
                </div>
            </div>
        </>
    )
}

export default Addresses