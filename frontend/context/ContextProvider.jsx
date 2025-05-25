/* eslint-disable react/prop-types */
import React from 'react'
import AppContext from './AppContext'
import reducer from './reducer'
import initState from './initState'

const AppContextProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(reducer, initState)

    return (
        <AppContext value={{ state, dispatch }}>
            {children}
        </AppContext>
    )

}

export default AppContextProvider