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

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignInPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);

    await fetch('/a')
    .then(res => res.json())
    .then(data => {
        console.log(data);
    })
    .catch(rejected => {
        console.log(rejected);
    });

    const inputanLogin = {
      'username' : username,
      'password' : password,
    }
    console.log(inputanLogin);
    // const response = await fetch("/login", {
    // method: "POST",
    // headers: {
    // 'Content-Type' : 'application/json'
    // },
    // body: JSON.stringify(inputanLogin)
    // })
    // if (response.ok){
    // console.log("it worked")
    // }
    
    // console.log({
    //   username: data.get('username'),
    //   password: data.get('password'),
    // });

  };

  const handleTest = async (event) => {
        const user = {
          "email" : "user1@gmail.com",
          "password" : "iniuser1"
        }
    
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

          //POST LOGIN
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

          try {
            const response = await fetch("https://api-swalayan-brbk6zo3cq-as.a.run.app/login", {
              method: "POST",
              body: JSON.stringify(user),
              headers: {
                "Content-Type": "application/json",
              },
            });
        
            if (response.ok) {
              const result = await response.json();
              console.log(result.user_id);
              // setAllPosts(result.data.reverse());
            }
          } catch (err) {
            alert(err);
          } finally {
            // setLoading(false);
          }
          


  }


  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
          <CssBaseline />
          {/* <KasirSideBar>
          </KasirSideBar> */}

              <Button
                onClick={handleTest}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                TEST ENDPOINT SEKARANGGGGGGGGGGG
              </Button>
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
              {/* <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid> */}
            </Box>
          </Box>
      </Container>
    </ThemeProvider>
  );
}