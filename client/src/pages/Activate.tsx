import React from 'react'
import { toast } from 'react-toastify';

import { activateUser } from '../services/UserService'
import { useNavigate, useParams } from 'react-router-dom'

const Activate = () => {
    const {token} = useParams();
    const navigate = useNavigate();

    const handleActivateUser = async() => {
        try {
            await activateUser({token});
            navigate("/SignIn");
        } catch (error:any) {
            console.log(error)
            toast.error( "user already exist")
        }        
    };
  return (
    <div>
        
            <button onClick={handleActivateUser}>Activate User</button>
        
    </div>
  )
}

export default Activate;