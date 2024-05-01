import { Link } from 'react-router-dom'
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
//import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Badge from '@mui/material/Badge';
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from 'services/UserService';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';


import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { filter } from 'redux/productSlice';
import { Input } from '@mui/material';

import { useLocation } from 'react-router-dom'

export const NavBar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const location = useLocation();
  

  const handleLogout = async() => {
    try {
      localStorage.removeItem("_id");
      await logoutUser();
      navigate("/")
    } catch (error:any) {
      
    }
  }
  const isLoggedIn = localStorage.getItem("_id");

  // const { userProfile, isLoggedIn } = useAppSelector((state:any) => state.userStore);
  // const { message, user} = userProfile
  
  const handleSearch = (e:any) => {
    dispatch(filter({name: e.target.value}))
  }


  const { favorite, cart } = useAppSelector((state:any) => state.productStore);
  
  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  
  return (
    <Box  sx={{ flex: 1, width: '100%' }}>
      <AppBar position="static" style={{backgroundColor: '#f5f5f5',color: '#212121'}}>
        <Toolbar >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          > 
           <MenuIcon />
           
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1}}>
            kids Duniaa
          </Typography>
          
          <Input placeholder='Search' name={'name'} onChange={handleSearch} disabled={location.pathname !== '/products'}/>

          <Link to="/">
            <Button style={{color: '#212121'}}>Home</Button>
          </Link>

          <Link to="/products">
            <Button style={{color: '#212121'}}>Products</Button>
          </Link>
          
          {isLoggedIn ? (
            <>
            <Button style={{color: '#212121'}} onClick={handleLogout}>Signout</Button>
            <Link to="/profile">
              <Button style={{ color: '#212121' }}>Profile</Button>
            </Link>
            </>
          ) : (
            <Link to="/SignIn">
            <Button style={{color: '#212121'}}>SignIn</Button>
          </Link>
          )}
                    
          
          <IconButton
            size="large"
            aria-label="change me"
            color="inherit" >
            <Badge badgeContent={favorite.length} color="primary">
              <FavoriteIcon /> 
            </Badge>
          </IconButton>  

          <IconButton
            size="large"
            aria-label="change me"
            color="inherit" >
            <Badge badgeContent={cart.length} color="primary">
            <Link to="/cart">
              <ShoppingCartIcon />
            </Link>
               
            </Badge>
          </IconButton> 

        </Toolbar>
      </AppBar>
    </Box>
  )
}



