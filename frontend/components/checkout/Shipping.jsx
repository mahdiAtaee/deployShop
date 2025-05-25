import React, { useEffect, useState } from 'react'
import AuthLink from '../partials/AuthLink'
import Addresses from './Addresses'
import useAppContext from '@/context/useAppContext'
import PaymentForm from './PaymentForm'
import * as API from '@/services/api'


const Shipping = () => {
    const [gateways, setGateways] = useState([])
    const { state } = useAppContext()
    let isUserLoggedIn
    if (state.user) {
        isUserLoggedIn = !!state.user.id
    }

    useEffect(() => {
        const fetchGateways = () => {
            API.get('/payments/gateways')
                .then(response => {
                    setGateways(response.data.Gateways)
                })
                .catch(error => console.log(error))
        }
        fetchGateways()
    }, [])



    return (
        <div className="flex-2/3">
            <div className="card border-0 row no-gutters p-3 box-hover">
                {isUserLoggedIn && <Addresses addresses={state.user.addresses} />}
                {isUserLoggedIn && <PaymentForm gateways={gateways} />}
                {!isUserLoggedIn && <AuthLink />}
            </div>
        </div>
    )
}

export default Shipping