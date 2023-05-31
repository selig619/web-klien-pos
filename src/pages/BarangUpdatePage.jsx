import {useState, useEffect} from 'react';

import AdminSideBar from '../layouts/AdminSideBar';
import MyDataGrid from '../layouts/MyDataGrid';
import {Box, Typography, Container, Stack, TextField, Select, MenuItem, Button, Grid} from '@mui/material';




export default function BarangUpdatePage() {
  // alert('adad');

  const [metric, setMetric] = useState("")

  // SIMPLE GETTT
  fetch('https://flask-web-klien-brbk6zo3cq-uc.a.run.app/transaksi')
  .then(res => res.json())
  .then(data => {
      console.log(data);
  })
  .catch(err => console.log(err))
  
  return (
  <>        
    <AdminSideBar>        
    </AdminSideBar>
    <Box
    sx={{ bgcolor: '', ml: 35, mt:2, border:'0px solid'  }}>
      {/* <Container component="main" maxWidth="lg"> */}


        <Typography component="h1" variant="h5" align='center'>
          Update Barang
        </Typography>

        <Box
          sx={{ m: 5, mt:2, border:'2px solid'  }}>

          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="nama"
                label="nama"
                name="nama"
                autoComplete="nama"
                autoFocus
                value={metric}
              />
            <TextField
                margin="normal"
                required
                fullWidth
                id="stok"
                label="stok"
                name="stok"
                autoComplete="stok"
                autoFocus
                value={metric}
              />
            <TextField
                margin="normal"
                required
                fullWidth
                id="harga-pokok"
                label="harga-pokok"
                name="harga-pokok"
                autoComplete="harga-pokok"
                autoFocus
                value={metric}
              />
              <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="harga-jual"
                  label="harga-jual"
                  name="harga-jual"
                  autoComplete="harga-jual"
                  autoFocus
                  value={metric}
                />
              <Button
                onClick={()=>{

                }}              
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                UPDATE
              </Button>
          </Box>


        </Box>

    </Box>
  </>
  )
}