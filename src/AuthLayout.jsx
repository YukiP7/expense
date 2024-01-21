import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'

export default function Protected({children, authentication = true}) {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        if(authentication !== authentication){
            navigate("/login")
        } else if(!authentication !== authentication){
            navigate("/")
        }
        setLoader(false)
    }, [ navigate, authentication])

  return loader ? <h1>Loading...</h1> : <>{children}</>
}