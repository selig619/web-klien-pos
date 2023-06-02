import React, {useState, useEffect} from 'react';

import AdminSideBar from '../layouts/AdminSideBar';
import MyDataGrid from '../layouts/MyDataGrid';
import {Box,Typography, CircularProgress, Stack, TextField, Select, MenuItem, Button, Grid} from '@mui/material';

import { useNavigate,BrowserRouter, Route, Routes } from 'react-router-dom';
import { GridActionsCellItem, GridDeleteIcon, GridLoadIcon, GridRowId } from '@mui/x-data-grid';


export default function BarangPage() {
  
  const navigate = useNavigate();

  const [barang, setBarang] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      // const response = await fetch('https://flask-web-klien-brbk6zo3cq-uc.a.run.app/barang');
      const response = await fetch('http://localhost:5000/barang');
      const jsonData = await response.json();
      const result = jsonData.data
      console.log(result);

      const newIdBarang = (result).map(e=>{
        // console.log(e)
        return{
          id : e.id_barang, 
          nama_barang : e.nama_barang, 
          stock_barang : e.stock_barang, 
          harga_jual : e.harga_jual,
          harga_pokok : e.harga_pokok
        }
      })
      console.log(newIdBarang);

      setBarang(newIdBarang);

      setIsLoading(false);
    } catch (error) {
      console.log('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) =>{
    console.log(id);
    try {
      await fetch(`http://localhost:5000/barang/${id}`, { method: 'DELETE' });
      setBarang((prevData) => prevData.filter((row) => row.id !== id));
    } catch (error) {
      console.log('Error deleting row:', error);
    }
  }
  
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
          sx={{ m: 5, mt:2, border:'0px solid'  }}>

            <Button
                onClick={()=>{
                  navigate("/add-barang")
                }}                
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                ADD BARANG
              </Button>

                {/* {barang.map(b => {
                  return <h4>{JSON.stringify(b)}</h4>
                })} */}

              {isLoading ? (
                <CircularProgress /> 
              ) : (
                <MyDataGrid
                  rows={barang}
                  columns={[
                    {field : 'id', type: "string",  headerName: "ID Barang", width: 250},
                    {field : 'nama_barang', type: "string", headerName: "Nama", width: 300},
                    {field : 'stock_barang', type: "number", headerName: "Stok", width: 100},
                    {field : 'harga_pokok', type: "number", headerName: "Harga Pokok", width: 100},
                    {field : 'harga_jual', type: "number", headerName: "Harga Jual", width: 100},
                    {
                      field: 'actions', headerName: "Action", type: 'actions', width: 120,
                      renderCell: (params) => (
                        <React.Fragment>
                          <GridActionsCellItem
                            icon={<GridLoadIcon />}
                            label="Update"
                            onClick={ () => { 
                              navigate(`update-barang?idBarang=${params.id}`??"");
                            }}
                          />                          
                          <GridActionsCellItem
                            icon={<GridDeleteIcon />}
                            label="Delete"
                            onClick={() => handleDelete(params.row.id)}
                          />

                        </React.Fragment>
                      ),
                      // getActions: (params) => [
                      //   <GridActionsCellItem
                      //     color="info" label="Detail"
                      //     icon={<GridLoadIcon />}
                      //     onClick={ () => { 
                      //       navigate(`update-barang?idBarang=${params.id}`??"");
                      //     }}
                      //   />,
                      //   <GridActionsCellItem
                      //     color="error" label="Delete"
                      //     icon={<GridDeleteIcon />}
                      //     onClick={handleDelete(params.row.id)}
                      //   />
                      // ],
                    },              
                  ]

                  }
                />
              )}
        </Box>

    </Box>

  )
}