import React from 'react'
import {useState, useEffect} from 'react';

import AdminSideBar from '../layouts/AdminSideBar';
import {Box,Typography, CircularProgress, Stack, TextField, Select, MenuItem, Button, Grid} from '@mui/material';
import { GridActionsCellItem, GridDeleteIcon, GridLoadIcon, GridRowId } from '@mui/x-data-grid';
import MyDataGrid from '../layouts/MyDataGrid';
import KasirSideBar from '../layouts/KasirSideBar';

function KasirPage() {
  const [userRole, setUserRole] = useState('');

  const [cashierUname, setCashierUname] = useState('');
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [numberOfItems, setNumberOfItems] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [cashInput, setCashInput] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [change, setChange] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [currentDate, setCurrentDate] = useState(false);
  const [note, setNote] = useState('');

  useEffect(() => {   
    cekRoleSideBar();

    setCurrentDate(new Date().toLocaleDateString())
    const storedCashierUname = localStorage.getItem('username');
    if (storedCashierUname) {
      setCashierUname(storedCashierUname);
    }
    fetchItems();
  }, []);

  const cekRoleSideBar = () =>{
    const role = localStorage.getItem('role');
    setUserRole(role);
  }

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/barang');
      const data = await response.json();
      const result = data.data

      const newIdBarang = (result).map(e=>{
        // console.log(e)
        return{
          id : e.id_barang, 
          nama_barang : e.nama_barang, 
          harga_barang : e.harga_jual
        }
      })
      // console.log(newIdBarang);

      setItems(newIdBarang);
      setLoading(false);
    } catch (error) {
      console.log('Error fetching items:', error);
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    // Check if the selected item already exists in the cart
    const existingItemIndex = cartItems.findIndex((item) => item.id === selectedItem.id);
    if (existingItemIndex !== -1) {
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex].numberOfItems += parseInt(numberOfItems);
      updatedCart[existingItemIndex].subtotal =
        updatedCart[existingItemIndex].numberOfItems * updatedCart[existingItemIndex].harga_barang;
      setCartItems(updatedCart);
    } else {
      const newItem = {
        id: selectedItem.id,
        nama_barang: selectedItem.nama_barang,
        harga_barang: selectedItem.harga_barang,
        numberOfItems: parseInt(numberOfItems),
        subtotal: selectedItem.harga_barang * parseInt(numberOfItems),
      };
      setCartItems([...cartItems, newItem]);
    }

    setTotalPrice((prevTotalPrice) => prevTotalPrice + selectedItem.harga_barang * parseInt(numberOfItems));
    setNumberOfItems('');
  };

  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    const removedItem = cartItems.find((item) => item.id === id);
    setCartItems(updatedCart);
    setTotalPrice((prevTotalPrice) => prevTotalPrice - removedItem.subtotal);
  };

  const handleCashInput = (event) => {
    const cashValue = event.target.value;
    setCashInput(cashValue);

    const cash = parseFloat(cashValue);
    if (!isNaN(cash)) {
      const newChange = Math.max(cash - totalPrice, 0);
      setChange(newChange);
    } else {
      setChange(0);
    }
  };

  const handleReset = () => {
    setCartItems([]);
    setCashInput('');
    setNote('');
    setChange(0);
    setTotalPrice(0);
  };

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  const handleProceed = () => {
    setSaving(true);
    // console.log(cartItems);

    const newCartItems = (cartItems).map(e=>{
      // console.log(e)
      return{
        id_barang : e.id, 
        jumlah : e.numberOfItems, 
        nama_barang : e.nama_barang,
        harga : e.harga_barang,
        subtotal : e.subtotal,
      }
    })
    // console.log(newCartItems);

    const newTrans = {
        id_kasir: cashierUname,
        tgl_htrans: currentDate,
        total: totalPrice,
        notes: note,
        detail:newCartItems
    }
    // console.log(newTrans);

    // Make the API call to save the cart data
    fetch('http://localhost:5000/transaksi', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTrans),
    })
      .then((response) => response.json())
      .then((data) => {
        // respons API
        console.log('Data saved:', data);
        alert('Data saved:', data);
        setSaving(false);
        handleReset();
      })
      .catch((error) => {
        console.error('Error saving data:', error);
        alert('Error saving data:', error);
        setSaving(false);
      });

  };
  


  return (
    <>
      <Box
      sx={{ bgcolor: '', ml: 35, mt:2, border:'0px solid'  }}>
          {userRole === 'admin' && <AdminSideBar/>} 
          {userRole === 'kasir' && <KasirSideBar/>} 
     
          <Typography component="h1" variant="h5" align='center'>
            Kasir
          </Typography>

          {loading ? (
            <CircularProgress />
          ) : (
            <Box
              sx={{ m: 3, p: 3, border:'0px solid' }}>
              <Grid container>
                <Grid item xs >
                  {/* KOTAK Tanggal Kasir */}
                  <Box sx={{bgcolor:'lightgray', border:'1px solid black', borderRadius: '16px', height: 180}} p={3}>
                    <Grid item md={12} >
                      <Stack sx={{border:'0px solid'}} direction={'row'}>
                        <Typography sx={{my:'auto', fontWeight:700}}>
                          Tanggal
                        </Typography>                        
                        <TextField sx={{ml:1}} disabled
                          size='small'
                          id="tanggal_now" label="Tanggal" name="tanggal_now"
                          value={new Date().toLocaleString()}
                        />
                      </Stack>
                      <Stack sx={{border:'0px solid', mt:3}} direction={'row'}>
                        <Typography sx={{my:'auto', fontWeight:700}}>
                          Cashier
                        </Typography>                        
                        <TextField sx={{ml:1}} disabled
                          size='small'
                          id="nama_kasir" label="Kasir" name="nama_kasir"
                          onChange={() => {} }
                          value={cashierUname}
                        />
                      </Stack>
                    </Grid>                    
                  </Box>
                </Grid>
                
                {/* KOTAK Barang, jumlah, button tambah */}
                <Grid item xs sx={{ ml: 2}}>
                  <Box sx={{bgcolor:'lightgray', border:'1px solid black', borderRadius: '16px', height: 180}} p={3}>
                    <Grid item md={12}>
                      <Stack sx={{border:'0px solid'}} direction={'row'}>
                        <Typography sx={{my:'auto', fontWeight:700}}>
                          Barang
                        </Typography>

                        {/* SELECT BARANG */}
                        <Select sx={{ml:3, height: 7/8}}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={age}
                          label="Barang"
                          value={selectedItem}
                          onChange={(e) => setSelectedItem(e.target.value)}
                        >
                            {items.map((item) => (
                              <MenuItem key={item.id} 
                                        value={item}
                              >
                                {item.nama_barang}
                              </MenuItem>
                            ))}
                        </Select>
                        <Button
                          variant="contained"
                          sx={{minHeight: 7/8 , ml: 3}}
                          onClick={handleAddToCart}
                        >Tambah</Button>
                      </Stack>
                      <Stack sx={{border:'0px solid', mt:3}} direction={'row'}>
                        <Typography sx={{my:'auto', fontWeight:700}}>
                          Jumlah
                        </Typography>                        
                        <TextField sx={{ml:1}}
                          size='small'
                          id="jumlah" label="Jumlah" name="jumlah"
                          type="number"
                          value={numberOfItems}
                          onChange={(e) => setNumberOfItems(e.target.value)}
                        />
                      </Stack>
                    </Grid>                    
                  </Box>
                </Grid>
                <Grid item xs sx={{ ml: 2}}>

                  {/* KOTAK HARGA TOTAL */}
                  <Box sx={{ml: 2, my:'auto', bgcolor:'lightgray', border:'1px solid black', borderRadius: '16px', height: 180, maxWidth:7/8}} p={3}>
                    <Typography sx={{}} variant='h3' value>
                      {/* Rp {totalPrice==NaN ? 0 : totalPrice} */}
                      {totalPrice}
                    </Typography> 
                    {/* <TextField
                      label="Total Price"
                      value={totalPrice}
                      disabled
                    /> */}
                  </Box>
                </Grid>
              </Grid>            
              
              <Box
              sx={{ mt: 5, border:'0px solid' }}>
                <MyDataGrid sx={{mt: 5}}
                  // rows={ cartItems }
                  rows={ cartItems.map((item, index) => ({ id: index, ...item })) }
                  
                  columns={[
                    { field: 'id', headerName: 'ID', width: 150 },
                    { field: 'nama_barang', headerName: 'Nama', width: 200 },
                    { field: 'harga_barang', headerName: 'Harga', width: 100 },
                    { field: 'numberOfItems', headerName: 'Jumlah', width: 80 },
                    { field: 'subtotal', headerName: 'Subtotal', width: 150 },
                    {
                      field: 'actions',
                      headerName: 'Actions',
                      width: 80,
                      renderCell: (params) => (
                        // <GridActionsCellItem
                        //   icon={<GridDeleteIcon />}
                        //   label="Delete"
                        //   onClick={() => handleRemoveFromCart(params.row.id)}
                        // />
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleRemoveItem(params.row.id)}
                        >
                          Remove
                        </Button>
                      ),
                    },
                  ]}
                >
                </MyDataGrid>
              </Box>

              
              <Grid container sx={{mt : 5, height: 300}}>
                {/* CASH CHANGE */}
                <Grid item xs >
                  <Box sx={{bgcolor:'lightgray', border:'1px solid black', borderRadius: '16px', height: 180}} p={3}>
                    
                    <Grid item md={12}>
                      <Box sx={{p:1, height: 7/8}}>
                        <Stack sx={{border:'0px solid'}} direction={'row'}>
                          <Typography sx={{my:'auto', fontWeight:700}}>
                            Cash
                          </Typography>                        
                          <TextField sx={{ml:1}}
                            size='small'
                            id="jum_bayar" label="Cash" name="jum_bayar"
                            type="number"
                            value={cashInput}
                            onChange={handleCashInput}
                          />
                        </Stack>
                        <Stack sx={{border:'0px solid', mt:3}} direction={'row'}>
                          <Typography sx={{my:'auto', fontWeight:700}}>
                            Change
                          </Typography>                        
                          <TextField sx={{ml:1}} 
                            size='small'
                            id="jum_kembali" label="Change" name="jum_kembali"
                            value={change}
                            disabled
                          />
                        </Stack>
                      </Box>
                    </Grid>
                    
                  </Box>
                </Grid>  

                {/* NOTEEEEE */}            
                <Grid item xs >

                  <Box sx={{ml: 2, bgcolor:'lightgray', border:'1px solid black', borderRadius: '16px', height: 180}} p={3}>
                    <TextField  multiline
                      size='medium'
                      id="note" label="Note" name="note"
                      onChange={handleNoteChange}
                      value={note}
                    />
                  </Box>

                </Grid>

                {/* TOMBOL KANAN BWH */}
                <Grid item xs sx={{ml: 2}} >
                  
                  <Grid item md={12}>
                    <Box sx={{p:1, bgcolor:'white', border:'0px solid black', borderRadius: '16px', height: 60}}>
                      <Button
                        fullWidth
                        variant="contained"
                        sx={{ minHeight: 7/8 }}
                        onClick={handleReset}
                      >RESET</Button>
                    </Box>
                  </Grid>
                  <Grid item md={12}>
                    <Box sx={{p:1, bgcolor:'white', border:'0px solid black', borderRadius: '16px', height:100}} >
                      <Button
                        fullWidth
                        variant="contained"
                        sx={{minHeight: 7/8 }}
                        onClick={handleProceed}
                        disabled={!cartItems.length || !cashInput || parseFloat(change) < 0 || saving || cashInput < totalPrice}
                      >
                        {saving ? (
                          <CircularProgress size={24} color="inherit" />
                        ) : (
                          'PROSES'
                        )}                        
                      </Button>
                    </Box>                  
                  </Grid>

                </Grid>
                {/* END TOMBOL KANAN BWH */}

              </Grid>

            </Box>
          )}
      </Box>
    </>
  )
}

export default KasirPage

{/* <Stack sx={{border:'1px solid'}}>
<Box sx={{ml: 2, bgcolor:'lightblue', border:'2px solid'}} p={3}>
  ITEM 3
</Box>
</Stack>
<Stack sx={{border:'1px solid'}}>
<Box sx={{ml: 2, bgcolor:'lightblue', border:'2px solid'}} p={3}>
  ITEM 3
</Box>
</Stack> */}