import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { forgotPassword } from 'services/UserService';
import { toast } from 'react-toastify';

const theme = createTheme();


export const ForgotPassword = () => {

  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handlePasswordChange = (event:any) => {
    setNewPassword(event.target.value);
};
const handleEmailChange = (event:any) => {
  setEmail(event.target.value);
};

const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
   
  event.preventDefault();
      try{
          const response = await forgotPassword({email: email, password: newPassword});
          toast.success(response.message);
        
      } catch (error:any) {
          
      }
};
  return (
    <div>
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
            Create New Password
          </Typography>
          <Box component="form"  noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleEmailChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="New Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handlePasswordChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{backgroundColor: '#f5f5f5',color: '#212121'}}
            >
              Submit
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/SignIn" >
                  SignIn 
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </div>
  )
}

