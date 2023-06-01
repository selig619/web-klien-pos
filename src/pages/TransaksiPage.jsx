import {useState, useEffect} from 'react';

import AdminSideBar from '../layouts/AdminSideBar';
import MyDataGrid from '../layouts/MyDataGrid';
import {Typography, CircularProgress, Stack, TextField, Select, MenuItem, Button, Grid} from '@mui/material';

import Box from '@mui/material/Box';




export default function TransaksiPage() {
  const [trans, setTrans] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      // const response = await fetch('https://flask-web-klien-brbk6zo3cq-uc.a.run.app/trans');
      const response = await fetch('http://localhost:5000/transaksi');
      const jsonData = await response.json();
      const result = jsonData.data
      // console.log(result);

      const newTrans = (result).map(e=>{
        // console.log(e)
        const tgl = e.tgl_htrans
        return{
          id_transaksi : e.id_transaksi, 
          tgl_htrans : new Date( tgl ), 
          pembayaran : "Cash", 
          total : e.total
        }
      })
      const dataWithId = newTrans.map((item, index) => ({
        id: parseInt(index) + 1, // Add 1 to index to start the ordered number from 1
        ...item,
      }));
      console.log(dataWithId);

      setTrans(dataWithId);

      setIsLoading(false);
    } catch (error) {
      console.log('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  return (

    <Box
    sx={{ bgcolor: '', ml: 35, mt:2, border:'0px solid'  }}>
      {/* <Container component="main" maxWidth="lg"> */}

        <AdminSideBar>        
        </AdminSideBar>
        <Typography component="h1" variant="h5" align='center'>
          Transaksi Penjualan
        </Typography>
        {isLoading ? (
          <CircularProgress /> 
        ) : (
          <Box
            sx={{ m: 5, mt:2, border:'2px solid'  }}>
            <MyDataGrid
              rows={ trans }
              columns={[
                {field : 'id', headerName: "No", width: 50},
                {field : 'tgl_htrans', type: "dateTime", headerName: "Tanggal", width: 300},
                {field : 'id_transaksi', type: "string",  headerName: "ID Transaksi", width: 350},
                {field : 'pembayaran', type: "string", headerName: "Pembayaran", width: 100},
                {field : 'total', type: "number", headerName: "Total", width: 200}
              ]}
            >
            </MyDataGrid>


          </Box>
        )}
        

    </Box>

  )
}