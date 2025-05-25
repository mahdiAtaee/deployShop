export const addQueryArgs = (query, key, value) => {
    const queryParams = new URLSearchParams(query)
    if (queryParams.has(key)) {
        const prevValue = queryParams.get(key)
        queryParams.set(key, encodeURIComponent(`${prevValue},${value}`))
    } else {
        queryParams.set(key, value)
    }
    return queryParams.toString()
}
export const removeQueryArgs = (query, key, value) => {
    const queryParams = new URLSearchParams(query)
    if (queryParams.has(key)) {
        const newValue = decodeURIComponent(queryParams.get(key)).split(',').filter(currentValue => currentValue != value)

        if (newValue.length > 0) {
            queryParams.set(key, encodeURIComponent(newValue))
        } else {
            queryParams.delete(key)
        }
    }
    return queryParams.toString()
}
