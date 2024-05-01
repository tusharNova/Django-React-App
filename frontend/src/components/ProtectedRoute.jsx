import React from 'react'
// import { Naviagtes } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import api from '../api'
import { REFRESH_TOKEN, ACCESS_TOKEN } from '../constants'
import { useState , useEffect} from 'react'

function ProtectedRoute({ children }) {

    const [isAutherized, setIsAutherized] = useState(null);

    useEffect(() =>{
        auth.catch(() => setIsAutherized(false))
    }, [])


    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)
        try {
            const res = await api.post("/api/toekn/refresh", { refresh: refreshToken });
            if(res.status == 200){
                localStorage.setItem(ACCESS_TOKEN , res.data.access)
                setIsAutherized(true)
            }
            else{
                setIsAutherized(false)
            }
        } catch (error) {
            console.log(error);
            setIsAutherized(false)
        }
    }

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            setIsAutherized(false)
            return
        }
        const decode = jwtDecode(token)
        const tokenExpriation = decode.exp
        const now = Date.now() / 1000

        if (tokenExpriation < now) {
            await refreshToken()
        } else {
            setIsAutherized(true)
        }
    }

    if (isAutherized == null) {
        return <div>Loading....</div>
    }
    return isAutherized ? children : <Naviagte to="/login" />

}

export default ProtectedRoute