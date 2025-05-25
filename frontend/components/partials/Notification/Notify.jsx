/* eslint-disable react/prop-types */
import React from 'react'

const Notify = ({message, status}) => {
    console.log(status);
    
    return (
        <div
            className={`alert alert-solid-${status === true ? 'success' : 'danger'} alert-dismissible fade show`}
            role="alert"
        >
            {message}
            <button
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
            >
                <span aria-hidden="true">×</span>
            </button>
        </div>

    )
}

export default Notify