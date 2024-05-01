import { useNavigate } from 'react-router-dom';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite'
import DeleteForever from '@mui/icons-material/DeleteForever'
import Edit from '@mui/icons-material/Edit'
import MoreVert from '@mui/icons-material/MoreVert'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, addToFavorite} from 'redux/productSlice';
import { deleteProductById } from 'services/ProductService';
import { useAppDispatch, useAppSelector } from 'redux/hooks';

const Product = (props:any) => {

  const navigate = useNavigate();
  
  const {isAdmin, product, userId} = props;
  const {_id, name, image, price, slug } = product;

  const imageUrl = 'http://51.20.192.141:4000/product/image/'+ image;
  const dispatch = useAppDispatch();
  const { favorite, cart } = useAppSelector((state:any) => state.productStore);
  
  const handleDetailsPage = (slug:string) => {
    navigate(`/product/${slug}`)
  }

  const handleFavorite = () => {
    dispatch(addToFavorite(_id))
  }

  const handleCart = () => {
    dispatch(addToCart(product))
  }

  const handleDelete = async () => {
    const result = window.confirm("Want to delete?") 
    if(result) {
      deleteProductById(slug)
    }
  }

  const handleUpdate = () => {
    navigate(`/admin/updateProduct/${slug}`)
  }

  return (
    <div className='product'>
       
      <Card sx={{ maxWidth: 250 , maxHeight:270 }}>
        
        <CardMedia 
          sx={{ height:100 , width: 100}}
          image= {imageUrl}
        />
        <CardContent>
          <Typography gutterBottom  component="div">
            {name}
          </Typography>
          <Typography  color="text.secondary" variant="body2">
            price : DKK {price}
          </Typography>
        </CardContent>
        <CardActions>
          <FavoriteIcon color={favorite.includes(_id) ? 'error' : 'secondary'} onClick={handleFavorite}/>
          <ShoppingCartIcon onClick={handleCart}/>
          
          {isAdmin ? (
            <>
              <DeleteForever onClick={() => handleDelete()}/>
              <Edit onClick={() =>{handleUpdate()}}/>
            </>
          ) : ''}
          <MoreVert onClick={()=>{handleDetailsPage(slug)}}/>
        </CardActions>
      </Card>
    </div>
  );
}

export default Product