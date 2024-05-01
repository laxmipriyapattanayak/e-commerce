import React,{useState,useEffect} from 'react'
import { Category } from './Category';
import { useDispatch, useSelector } from 'react-redux';
import { allCategory } from 'redux/categorySlice';
import { useAppDispatch, useAppSelector } from 'redux/hooks';

export const Categories = () => {
    const dispatch = useAppDispatch();
    const { categorys } = useAppSelector((state:any) => state.categoryStore);
    const {message, category} = categorys;
    const { userProfile } = useAppSelector((state:any) => state.userStore);
    const { user} = userProfile
    useEffect(() => {
        dispatch(allCategory())
    },[dispatch])
    
    return (
      <div className='productCategory'>
        { category?.length > 0 && category?.map((c:any) => <Category key={c?._id} category={c} isAdmin={user?.is_admin === 1}/>)}
      </div>
    );
  };
  