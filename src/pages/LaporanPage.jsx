import {useState, useEffect} from 'react';

import AdminSideBar from '../layouts/AdminSideBar';
import MyDataGrid from '../layouts/MyDataGrid';
import {Typography, Container, Stack, TextField, Select, MenuItem, Button, Grid} from '@mui/material';

import Box from '@mui/material/Box';




export default function LaporanPage() {
  // alert('adad');

  const [metric, setMetric] = useState("")

  // SIMPLE GETTT
  fetch('https://flask-web-klien-brbk6zo3cq-uc.a.run.app/laporan')
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
          Laporan Penjualan
        </Typography>

        <Box
          sx={{ m: 5, mt:2, border:'2px solid'  }}>
          

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