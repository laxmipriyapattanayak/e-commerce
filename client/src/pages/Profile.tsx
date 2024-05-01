import React,{useEffect,useCallback} from 'react'
import { useLocation } from 'react-router-dom';
import { getRefreshToken } from '../services/UserService';

import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from 'redux/userSlice';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { Link } from 'react-router-dom';

const Profile = () => {

    const _id = localStorage.getItem("_id");
    const dispatch = useAppDispatch();
    
    useEffect(() => {
      if(_id) {
        dispatch(getUserProfile(_id))
      }
    },[dispatch, _id])
    
    const { userProfile } = useAppSelector((state:any) => state.userStore);
    const { message, user} = userProfile

    const handleRefresh = useCallback(async () => {
      try{
        const refreshToken = await getRefreshToken();
        console.log(refreshToken);
      }catch(error) {
        console.log(error);
      }
    },[]);
    
    useEffect(() => {
      const interval = setInterval(() => {
        handleRefresh()
      }, 1000 * 20);
      return () => clearInterval(interval)
    }, [handleRefresh])

  return (
    <div> 
       <h2>{user ? user?.is_admin ? 'Admin Profile' : 'User Profile' : 'Unknown User'} </h2>
       <div className='profile'>
        {user && (
            <div>
                <h3>name:{user.name}</h3>
                <p>Email:{user.email}</p>
                <p>phone:{user.phone}</p>
            </div>
        )}
       </div>
       <div>
        {user?.is_admin ? (<>
            <Link to="/admin/createProduct">Create Product</Link> <br/>
            <Link to="/admin/createCategory">Create Category</Link><br/>
            <Link to="/products">View Products</Link><br/>
            <Link to="/admin/allUsers">View All users</Link><br/>
            <Link to="/">View Categories</Link>
        </>) : (<>
          <Link to="/products">Explore Products</Link>
        </>
        )}
       </div>
    </div>
  );
};

export default Profile;