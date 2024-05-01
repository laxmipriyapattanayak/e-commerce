import * as React from 'react';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { createProduct, getSingleProductRequest, updateProductById } from 'services/ProductService';
import { ProductType } from 'types/product';
import { allCategory } from 'redux/categorySlice';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/hooks';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormControl,  FormLabel, Input, MenuItem, Radio, RadioGroup, Select } from '@mui/material';



const theme = createTheme();
export const CreateProduct = () => {
  const [product,setProduct] = useState<ProductType>({
      name : '',
      slug: '',
      description: '',
      image: '',
      price: 0,
      sold: 0,
      productCategory: '',
      productType: '',
      ageGroup: '',
      quantity: 0,
      shipping: false
  })
  const {slug} = useParams();

  const fetchProductbySlug = async (slug:any) => {
    const singleProduct:any = await getSingleProductRequest(slug)
    setProduct(singleProduct?.product)
  }

  const dispatch = useAppDispatch();
  const { categorys } = useAppSelector((state:any) => state.categoryStore);
  const { category } = categorys;
  
  useEffect(() => {
      dispatch(allCategory())
      
      if(slug) {
        fetchProductbySlug(slug)
      }
  },[dispatch, slug])

  const handleChange = (event:any) => {
      const { name, value, files } = event.target;
      setProduct({
      ...product,
      [name]: name === 'image' ? files[0] : value,
      });
      
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
        if(slug) {
          const updateResponse = await updateProductById(slug, product);
          toast(updateResponse.message)
        } else {
          const createResponse = await createProduct(product)
          toast(createResponse.message)
        }
      }catch(error: any) {
        toast(error?.message)
      }
      
      setProduct({
        name : '',
        slug: '',
        description: '',
        image: '',
        price: 0,
        sold: 0,
        productCategory: '',
        productType: '',
        ageGroup: '',
        quantity: 0,
        shipping: false
    })
  };
  
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
         <Typography component="h1" variant="h5" >
            { slug ? 'Update' : 'Create'} Product
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }} >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Product name"
                  autoFocus
                  onChange={handleChange}
                  value={product?.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Product description"
                  multiline
                  rows={4}
                  placeholder="Enter text here"
                  variant="outlined"
                  id="description"
                  name="description"
                  onChange={handleChange}
                  value={product?.description}
                />
              </Grid>
              <Grid item xs={12}>
              <FormLabel>product image</FormLabel> <br/>
                <Input
                    type="file"
                    id="image"
                    name="image"
                    onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="price"
                  label="Product price"
                  type="number"
                  id="price"
                  onChange={handleChange}
                  value={product.price}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="sold"
                  label="Product sold"
                  type="number"
                  id="sold"
                  onChange={handleChange}
                  value={product.sold}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="quantity"
                  label="Product quantity"
                  type="number"
                  id="quantity"
                  onChange={handleChange}
                  value={product.quantity}
                />
              </Grid>
              <Grid item xs={12}>
              <FormLabel>Product category</FormLabel>
                <Select
                    id="category"
                    name="productCategory"
                    required
                    defaultValue=""
                    onChange={handleChange} 
                    value={product.productCategory ? product.productCategory : ''}
                    >
                {category?.map((c:any) => <MenuItem key={c?._id} value={c?._id}>{c?.name}</MenuItem> )}
                    
                </Select>
              </Grid>
              <Grid item xs={12}>
              <FormLabel>Product for</FormLabel>
              <Select
                    id="productType"
                    name="productType"
                    required
                    defaultValue=""
                    onChange={handleChange} 
                    value={product.productType ? product.productType : ''}
                    >
                    <MenuItem value={'baby-boy'}>Baby-boy</MenuItem>
                    <MenuItem value={'baby-girl'}>Baby-girl</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12}>
              <FormControl>
                <FormLabel id="ageGroup">Age group</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="age-group"
                    name="ageGroup"
                    onChange={handleChange}
                    value={product.ageGroup}
                >
                    <FormControlLabel value="0to3" control={<Radio />} label="0-3 months" />
                    <FormControlLabel value="3to6" control={<Radio />} label="3-6 months" />
                    <FormControlLabel value="6to9" control={<Radio />} label="6-9 months" />
                    <FormControlLabel value="9to12" control={<Radio />} label="9-12 months" />
                </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="shipping"
                  label="Shipping"
                  id="shipping"
                  onChange={handleChange}
                  value={product.shipping}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              { slug ? 'Update' : 'Create'} Product
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}



