/* eslint-disable react/prop-types */
import { addQueryArgs, removeQueryArgs } from '@/services/queryString'
import React from 'react'
import { useRouter } from 'next/router'

const Filter = ({ category }) => {
    const router = useRouter()
    const handleChangeFilter = (e, title, slug) => {
        const isCheckedFilter = e.target.checked
        const query = isCheckedFilter
            ? addQueryArgs(router.query, title, slug)
            : removeQueryArgs(router.query, title, slug)
            
        router.push({
            pathname: router.pathname,
            query
        })

    }

    return (
        <div className='col-12 col-md-3'>
            {category.groups.map(group => (
                <>
                    <h2>
                        {group.title}
                    </h2>
                    <ul key={group.slug} className="custom-list custom-list-border">
                        {group.attributes.map((attribute) => (
                            <li key={attribute.slug}>
                                <div className="form-group">
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" onChange={(e) => handleChangeFilter(e, group.title, attribute.slug)} className="custom-control-input" id={attribute.slug} />
                                        <label className="custom-control-label" htmlFor={attribute.slug}>{attribute.title}</label>
                                    </div>
                                </div>

                            </li>
                        ))}
                    </ul>
                </>
            ))}
        </div>
    )
}

export default Filter