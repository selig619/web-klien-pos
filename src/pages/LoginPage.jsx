import {useState, useEffect} from 'react';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AdminSideBar from '../layouts/AdminSideBar';
import KasirSideBar from '../layouts/KasirSideBar';

import TransaksiPage from '../pages/TransaksiPage';
import { useNavigate, Navigate,BrowserRouter, Route, Routes } from 'react-router-dom';

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignInPage() {

  const navigate = useNavigate();

  const getUsername = localStorage.getItem("username")
  const getPassword = localStorage.getItem("password")

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    const user = {
      "username" : username,
      "password" : password
    }
    console.log(user);
    
    try {
      // const response = await fetch("https://flask-web-klien-brbk6zo3cq-uc.a.run.app/login", {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        body: JSON.stringify(user),         
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log(result);
        localStorage.setItem("username", username)
        localStorage.setItem("password", password)
        localStorage.setItem("role", result.data[0].role)
        // localStorage.setItem("id", result.username.id)

        navigate("/transaksi")
      }
      // else alert(await response.json().message);
      else alert("Gagal login!");
    } catch (err) {
      alert(err);
    } finally {
      // setLoading(false);
    }

  };

  const handleTest = async () => {
    
      //POST LOGIN
      // await fetch(
      //   "https://api-swalayan-brbk6zo3cq-as.a.run.app/login",
      //   {
      //     method:'POST',
      //     body: JSON.stringify(user) ,
      //     headers: {
      //       'Accept': '*/*',
      //       'Content-Type': 'application/json',
      //     },
      //   }      
      // ).then(response=>response.json().then(
      //   (data) => {
      //         console.log(data);
      //     })
      // ).catch(err => {console.log(err)})

          //GET LOGIN
          // await fetch(
          //   'https://flask-web-klien-brbk6zo3cq-uc.a.run.app/index',
          //   {
          //     method:'GET',
          //     // body: user,
          //     headers: {
          //       'Content-Type': 'application/json',
          //     },
          //   }      
          // ).then(response=>response.json()
          // .then(
          //   (data) => {
          //         console.log(data);
          //     })
          // )
  }


  return (
  <>
    {
      getUsername&&getPassword ? <Navigate to="/transaksi"/>
      :

      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            
                {/* <Button
                  onClick={handleTest}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  TEST ENDPOINT SEKARANGGGGGGGGGGG WKWKWKKWKW
                </Button> */}
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
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  value={username} onChange={e => setUsername(e.target.value)}
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
                  value={password} onChange={e => setPassword(e.target.value)}
                />
                
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                
              </Box>
            </Box>
        </Container>
      </ThemeProvider>
    }
</>
  );
}