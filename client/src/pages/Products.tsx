import React,{useState,useEffect} from 'react'
import Product from './Product'
import { Button, Card, TextField } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { filter, readAllProduct } from 'redux/productSlice';
import { getUserProfile } from 'redux/userSlice';
import { useAppDispatch, useAppSelector } from 'redux/hooks';


const Products = () => {

    const dispatch = useAppDispatch();
    const _id = localStorage.getItem("_id");
    
    useEffect(() => {
      dispatch(readAllProduct())
    },[dispatch, _id])

    const { all_products, favorite, cart } = useAppSelector((state:any) => state.productStore);    
    const {message, products } = all_products;
    
    const { userProfile } = useAppSelector((state:any) => state.userStore);
    const { user} = userProfile
    const [filterBody, setFilterBody] = useState({});

    const handleFilter = (e: any) => {
      setFilterBody({...filterBody, [e.target.name] : e.target.name === 'price' ? e.target.value.split('-') : e.target.value})  
    }

    const applyFilter = (e:any) => {
      e.preventDefault();
      dispatch(filter(filterBody))
    }
    

    return (
      <div className='products'>   
          <form onSubmit={applyFilter}>
            <Card sx={{ minWidth:200 , minHeight:500 }}>
              <FormControl >
                <FormLabel id="filter">Filter By Price<hr/></FormLabel>
                <RadioGroup
                  aria-labelledby="filter"
                  defaultValue="minimum"
                  name="price"
                  onChange={handleFilter}
                >
                  <FormControlLabel value="50-100" name="price" control={<Radio />} label="50dkk-100dkk" />
                  <FormControlLabel value="100-200" name="price" control={<Radio />} label="100dkk-200dkk" />
                  <FormControlLabel value="200-500" name="price" control={<Radio />} label="200dkk-500dkk" />
                </RadioGroup>
                
                <FormLabel id="filter">Filter By Gender<hr/></FormLabel>
                <RadioGroup
                  aria-labelledby="filter"
                  defaultValue="minimum"
                  name="productType"
                  onChange={handleFilter}
                >
                  <FormControlLabel value="baby-boy" name="productType" control={<Radio />} label="baby boy" />
                  <FormControlLabel  value="baby-girl" name="productType" control={<Radio />} label="baby girl" />
                </RadioGroup>
                
                <FormLabel id="filter">Filter By Age<hr/></FormLabel>
                <RadioGroup
                  aria-labelledby="filter"
                  defaultValue="minimum"
                  name="ageGroup"
                  onChange={handleFilter}
                >
                  <FormControlLabel value="0to3" name="ageGroup" control={<Radio />} label="0-3months" />
                  <FormControlLabel value="3to6" name="ageGroup" control={<Radio />} label="3-6months" />
                  <FormControlLabel value="6to9" name="ageGroup" control={<Radio />} label="6-9months" />
                  <FormControlLabel value="9to12" name="ageGroup" control={<Radio />} label="9-12months" />
                </RadioGroup>

                <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Apply
                </Button>

              </FormControl>
            </Card>   
          </form>
        <div className='all__products'>
          { products?.length > 0 && products?.map((p: any) => <Product key={p._id} product={p} isAdmin={user?.is_admin === 1} userId={user?._id ? user?._id : 'UNKNOWN'}/>)}
        </div>
      </div>
    );
  };
  
  export default Products