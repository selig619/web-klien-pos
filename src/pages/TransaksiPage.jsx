import {useState, useEffect} from 'react';

import AdminSideBar from '../layouts/AdminSideBar';
import MyDataGrid from '../layouts/MyDataGrid';
import {Typography, Container, Stack, TextField, Select, MenuItem, Button, Grid} from '@mui/material';

import Box from '@mui/material/Box';




export default function TransaksiPage() {
  // alert('adad');

  const [metric, setMetric] = useState("")
  const [support, setSupport] = useState()
  const [metricValue, setmetricValue] = useState()
  const [token, setToken] = useState("")
  
  const [file, setFile] = useState()

  // const handleUpload = async (event) => {
  //   event.preventDefault();

    // try {
    //   // const response = await fetch("https://api-swalayan-brbk6zo3cq-as.a.run.app/arm-csv", {
    //   const response =  fetch("https://flask-web-klien-brbk6zo3cq-uc.a.run.app/transaksi", {
    //     method: "GET"
    //   });
  
    //   if (response.ok) {
    //     const result =  response.json();
    //     console.log(result);
    //     // setAllPosts(result.data.reverse());
    //   }
    // } catch (err) {
    //   alert(err);
    // } finally {
    //   // setLoading(false);
    // }

    // SIMPLE GETTT
    fetch('https://flask-web-klien-brbk6zo3cq-uc.a.run.app/transaksi')
    .then(res => res.json())
    .then(data => {
        console.log(data);
    })
    .catch(err => console.log(err))



  // };




  return (

    <Box
    sx={{ bgcolor: '', ml: 35, mt:2, border:'0px solid'  }}>
      {/* <Container component="main" maxWidth="lg"> */}

        <AdminSideBar>        
        </AdminSideBar>
        <Typography component="h1" variant="h5" align='center'>
          Transaksi Penjualan
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