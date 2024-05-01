import * as React from 'react';
import { Link } from 'react-router-dom'

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { loginUser } from 'services/UserService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState } from 'react';



interface userSignin {
 email: string;
 password: string;   
}


const theme = createTheme();

export const Signin = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState<userSignin>({
    email: '',
    password: '',
  });
  const handleInputChange = (event:any) => {
    setValue((prevState) => {
      return {...prevState, [event.target.name]: event.target.value};
    });
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try{
        const response = await loginUser(value);
        navigate("/profile");
        if(response?.user ) {
          localStorage.setItem("_id", response?.user.id);
        } 

      } catch (error:any) {
        toast('signin failed An error occurred');
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" >
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={handleInputChange}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleInputChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{backgroundColor: '#f5f5f5',color: '#212121'}}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/forgotPassword" >
                  Forgot password?
                </Link>
                <br/>
                <Link to="/SignUp" className='nav__link'>
                  {"Don't have an account? Sign Up"}
                </Link>
                <br/>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default Signin