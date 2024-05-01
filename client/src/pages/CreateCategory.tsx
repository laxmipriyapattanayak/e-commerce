import * as React from 'react';
import { useState , useEffect} from 'react';
import { toast } from 'react-toastify';
import { createCategories, getSingleCategoryRequest, updateCategory} from 'services/CategoryService';
import { useParams } from 'react-router-dom';
import { CategoryType } from 'types/category';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {  FormLabel, Input } from '@mui/material';


const theme = createTheme();
export const CreateCategory = () => {
    const [category,setCategory] = useState<CategoryType>({
      name : '',
      slug : '',
      image: '', 
    })
    

    const {slug} = useParams();
    //fetch single category
    const fetchCategory = async (slug: string) => {
      const singleCategory:any = await getSingleCategoryRequest(slug)
      setCategory(singleCategory?.category)
    }

    useEffect(() => {
      
      if(slug) {
        fetchCategory(slug)
      }

  },[slug])
  

    const handleChange = (event:any) => {
        const { name, value, files } = event.target;
        setCategory({
          ...category,
          [name]: name === 'image' ? files[0] : value,
        });
        
    };
    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        
        try {
          event.preventDefault();
          if(slug) {
            const updateResponse = await updateCategory(slug, category);
            console.log(updateResponse )
            toast(updateResponse)
          } else {
            const createResponse = await createCategories(category)
            console.log(createResponse)
            toast(createResponse)
          }
        }catch(error: any) {
          toast(error?.message)
        }

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
          { slug ? 'Update' : 'Create'} Category
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleSubmit} >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="category name"
                  autoFocus
                  onChange={handleChange}
                  value={category?.name}
                />
              </Grid>
              
              <Grid item xs={12}>
              <FormLabel>Category image</FormLabel>
                <Input
                    type="file"
                    id="image"
                    name="image"
                    onChange={handleChange}
                />
              </Grid>     
            </Grid>  
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
               { slug ? 'Update' : 'Create'} Category
            </Button>     
           
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}



