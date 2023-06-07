import {useState, useEffect} from 'react';

import AdminSideBar from '../layouts/AdminSideBar';
import { useNavigate } from 'react-router-dom';
import {Box, Typography, TextField, Select, MenuItem, Button, Grid} from '@mui/material';
import KasirSideBar from '../layouts/KasirSideBar';
import AppBarAtas from '../layouts/AppBarAtas';


export default function BarangInsertPage() {
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();

  const [nama, setNama] = useState('');
  const [stok, setStok] = useState('');
  const [hargaJual, setHargaJual] = useState('');
  const [hargaPokok, setHargaPokok] = useState('');

  useEffect(() => {   
    cekRoleSideBar();
  }, []);

  const cekRoleSideBar = () =>{
    const role = localStorage.getItem('role');
    setUserRole(role);
  }

  const handleNamaChange = (event) => {
    setNama(event.target.value);
  };
  const handleStokChange = (event) => {
    setStok(event.target.value);
  };
  const handleHargaJualChange = (event) => {
    setHargaJual(event.target.value);
  };
  const handleHargaPokokChange = (event) => {
    setHargaPokok(event.target.value);
  };

  
  const handleAddBarang = async () => {
    try {
      const newItem = {
        nama_barang: nama,
        stock_barang: stok,
        harga_pokok: hargaPokok,
        harga_jual: hargaJual
      };
      // await fetch('http://localhost:5000/barang', {
      await fetch('https://flask-web-klien-brbk6zo3cq-uc.a.run.app/barang', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });
      // reset input
      setNama('');
      setStok('');
      setHargaJual('');
      setHargaPokok('');
      // setOpenDialog(false);
      alert('Item added successfully!');      
      navigate(-1)
    } catch (error) {
      console.log('Error adding item:', error);
      // setOpenDialog(false);
      alert('Error adding item. Please try again.');
    }
  };
  
  return (
  // <>        
    <Box
    sx={{ bgcolor: '', ml: 35, mt:2, border:'0px solid'  }}>
      {/* <Container component="main" maxWidth="lg"> */}
        {userRole === 'admin' && <AdminSideBar/>} 
        {userRole === 'kasir' && <KasirSideBar/>} 

        <AppBarAtas/>

        <Box
          sx={{ m: 5, border:'0px solid'  }}>

          <Typography sx={{ mt:9, mb:4 }} component="h1" variant="h5" align='center'>
            Tambah Barang
          </Typography>            

          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="nama"
                label="Nama"
                name="nama"
                autoFocus
                value={nama}
                onChange={handleNamaChange}
              />
            <TextField
                margin="normal"
                required
                fullWidth
                id="stok"
                label="Stok"
                name="stok"
                value={stok}
                onChange={handleStokChange}
              />
            <TextField
                margin="normal"
                required
                fullWidth
                id="harga-pokok"
                label="Harga Pokok"
                name="harga-pokok"
                value={hargaPokok}
                onChange={handleHargaPokokChange}
              />
              <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="harga-jual"
                  label="Harga Jual"
                  name="harga-jual"                  
                  value={hargaJual}
                  onChange={handleHargaJualChange}
                />
              <Button
                onClick={handleAddBarang}              
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                TAMBAH
              </Button>
          </Box>


        </Box>

    </Box>
  // </>
  )
}