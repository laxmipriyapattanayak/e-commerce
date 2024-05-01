import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { readAllProduct } from 'redux/productSlice';
import Product from './Product';

const CategoryProduct = () => {
    const {id} = useParams();
    const dispatch = useAppDispatch();
    
    useEffect(() => {
      dispatch(readAllProduct())
    },[dispatch])

    const { all_products, favorite, cart } = useAppSelector((state:any) => state.productStore);    
    const {message, products } = all_products;

    return (
        <div className='all__products'>
            { products && products.filter((product:any) => product.productCategory._id === id)?.map((p: any) => <Product key={p._id} product={p} isAdmin={false} userId={'UNKNOWN'}/>)}
        </div>
    )
}

export default CategoryProduct