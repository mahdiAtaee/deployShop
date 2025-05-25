import React from 'react'
import Item from './Item'
import useAppContext from '@/context/useAppContext'

const Items = () => {
    const { state } = useAppContext()

    return (

        <div className="w-full flex-3/4 grow">
            <ul>
                {state.basket.map((item) => <Item key={item.productID} {...item} />)}
            </ul>
        </div>

    )
}

export default Items