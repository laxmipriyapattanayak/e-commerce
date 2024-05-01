import React from 'react'
import { toast } from 'react-toastify';

import {  resetPassword } from '../services/UserService'
import { useNavigate, useParams } from 'react-router-dom'

const ResetPassword = () => {
    const {token} = useParams();
    const navigate = useNavigate();

    const handleResetPassword = async() => {
        try {
            await resetPassword({token});
            navigate("/SignIn");
        } catch (error:any) {
            console.log(error)
            toast.error( "user already exist")
        }        
    };
  return (
    <div>
        
            <button onClick={handleResetPassword}>Reset password</button>
        
    </div>
  )
}

export default ResetPassword;