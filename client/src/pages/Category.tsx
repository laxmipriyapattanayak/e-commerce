
import { useNavigate } from 'react-router-dom';


import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import DeleteForever from '@mui/icons-material/DeleteForever';
import Edit from '@mui/icons-material/Edit';
import { deleteCategoryById } from 'services/CategoryService';
import { Link } from 'react-router-dom';


export const Category = (props:any) => {
    
   const navigate = useNavigate();

    const {_id, name, image, slug } = props.category;
    const imageUrl = 'http://localhost:4000/category/image/'+image;

    const isAdmin = props.isAdmin;

    const handleDelete = () => {
      const result = window.confirm("Want to delete?") 
      if(result) {
        deleteCategoryById(slug)
    }
  }

    const handleUpdate = () => {
      navigate(`/admin/updateCategory/${slug}`)
    }

    const handleViewCategoryProducts = (slug: string) => {

    }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={imageUrl} alt={name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={()=>{handleViewCategoryProducts(slug)}}>
          <Link to={'/category/'+_id+'/product'}>View Products</Link>
        </Button>
        {isAdmin ? (
            <>
              <DeleteForever onClick={() => handleDelete()}/>
              <Edit onClick={() =>{handleUpdate()}}/>
            </>
          ) : ''}
          
      </CardActions>
    </Card>
    
  );
}


