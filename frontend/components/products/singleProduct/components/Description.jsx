/* eslint-disable react/prop-types */
import React from 'react'

const Description = (props) => {
  return (
    <div
      className="tab-pane fade show active"
      id="branding"
      role="tabpanel"
      aria-labelledby="branding-tab"
    >
      <h4 className="mb-3">توضیحات</h4>
      <p className="text-md text-gray-400">{props.describe}</p>
    </div>

  )
}

export default Description