import {useState, useEffect} from 'react';

import AdminSideBar from '../layouts/AdminSideBar';
import MyDataGrid from '../layouts/MyDataGrid';
import {Box,Typography, Container, Stack, TextField, Select, MenuItem, Button, Grid} from '@mui/material';

import { useNavigate,BrowserRouter, Route, Routes } from 'react-router-dom';




export default function BarangPage() {
  // alert('adad');
  
  const navigate = useNavigate();
  const [metric, setMetric] = useState("")

  // SIMPLE GETTT
  fetch('https://flask-web-klien-brbk6zo3cq-uc.a.run.app/barang')
  .then(res => res.json())
  .then(data => {
      console.log(data);
  })
  .catch(err => console.log(err))
  
  return (

    <Box
    sx={{ bgcolor: '', ml: 35, mt:2, border:'0px solid'  }}>
    {/* <Container component="main" maxWidth="lg"> */}

        <AdminSideBar>        
        </AdminSideBar>
        <Typography component="h1" variant="h5" align='center'>
          Master Barang
        </Typography>

        <Box
          sx={{ m: 5, mt:2, border:'2px solid'  }}>

            <Button
                onClick={()=>{
                  navigate("/add-barang")
                }}
                
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                ADD BARANG
              </Button>
          

          <MyDataGrid
            // sx={{ marg:5  }}
            rows={[
              {'id':'aaa','umur':12},{'id':'bbbb','umur':54}
            ]}
            columns={[
              {field : 'id', headerName: "ID"},
              {field : 'umur', headerName: "Umur"},
              
            ]

            }
          >

          </MyDataGrid>


        </Box>

    </Box>

  )
}