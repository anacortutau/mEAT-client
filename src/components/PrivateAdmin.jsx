import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/auth.context'

//private for admin user
function PrivateAdmin(props) {

    const {isAdmin, setIsAdmin} = useContext(AuthContext)

    if(isAdmin === true){
        return props.children
    }else {
        return <Navigate to="/"/>
    }

}

export default PrivateAdmin