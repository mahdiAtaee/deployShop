'use client';
/* eslint-disable react/prop-types */
import React from 'react'
import Modal from 'react-modal'
import { BiSolidRightArrowAlt } from 'react-icons/bi'


const customStyles = {
    content: {
        position: 'fixed',
        minWidth: '60%',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '1000'
    },
};


const AddressList = ({ modalIsOpen, closeModal, addresses, handleChangeAddress }) => {

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="address modal"
            className="w-dvw h-dvh md:w-2/3 md:h-auto overflow-hidden bg-white p-4"
        >
            <div className='w-full' dir='rtl'>
                <button onClick={closeModal} className='cursor-pointer text-xl flex items-center justify-center gap-2'>
                    <BiSolidRightArrowAlt />
                    <span>انتخاب آدرس</span>
                </button>
            </div>
            <div className='w-full p-4' dir='rtl'>
                {addresses.map((address, index) => (
                    <div key={index} className="flex items-center justify-stretch w-full my-4 rounded">
                        <input
                            type="radio"
                            id={`address-${index}`}
                            name="deliveryAddress"
                            onChange={() => { handleChangeAddress(address) }}
                            className="hidden peer"
                        />
                        <label className="shadow shadow-gray-300 peer-checked:shadow-blue-500 peer-checked:bg-blue-50 flex items-center w-full h-full cursor-pointer gap-4  px-4 py-2" htmlFor={`address-${index}`}>
                            <i className="vl-building mr-4 fa-2x d-block text-primary pb-2"></i>
                            <h5 className="mb-0 font-weight-bold">{address.title}</h5>
                            <div className='w-100 mt-4'>
                                <h6 className="mb-1 font-weight-normal text-muted">{address.fullName}</h6>
                                <span>{address.address}</span>
                            </div>
                        </label>
                    </div>
                ))}
            </div>
        </Modal >
    )
}

export default AddressList