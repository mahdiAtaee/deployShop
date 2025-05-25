import * as API from './api'

export const check = async () => {
    const authToken = localStorage.getItem("token")
    if (!authToken) {
        return false
    }
    try {
        const response = await API.post('/auth/check', { authToken })
        if (response.data.success) {
            return true
        }
        return false
    } catch (error) {
        console.log(error)
        return false;
    }
}

export const login = async (email, password) => {
    try {
        const loginUser = await API.post('/auth/login', {
            email, password
        })

        if (loginUser.data.success) {
            return [true, loginUser.data.token, loginUser.data.user]
        }
    } catch (error) {
        console.log(error.message);

        return [false]
    }

}

export const register = async (userData) => {
    try {
        const result = await API.post('/auth/register', {
            ...userData
        })

        if (result && result.data.success) {
            return true
        }
    } catch (error) {
        console.log(error.message);
        return false
    }

}