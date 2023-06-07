import {useState, useEffect} from 'react';

import AdminSideBar from '../layouts/AdminSideBar';
import MyDataGrid from '../layouts/MyDataGrid';
import {Box, Typography, CircularProgress , Stack, TextField, Select, MenuItem, Button, Grid} from '@mui/material';
// import { useSearchParams, , useLocation } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import AppBarAtas from '../layouts/AppBarAtas';


// const initVal = {
//   nama_barang: '',
//   stock_barang: '',
//   harga_pokok: '',
//   harga_jual: '',
// }
// const [idBarang, setIdBarang] = useState("");
// const [barang, setBarang] = useState(initVal);

export default function BarangUpdatePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    id_barang: '',
    nama_barang: '',
    stock_barang: '',
    harga_pokok: '',
    harga_jual: '',
  });


  useEffect( () => {
    const query = new URLSearchParams(location.search);
    const idBarang = query.get('idBarang');

    if (idBarang) {
      fetchBarang(idBarang);
    }

    // loadParams()
    // fetchBarang()
  },[location.search])

  const fetchBarang = async (idBarang) =>{
    try {
      // const response = await fetch(`http://localhost:5000/barang?idBarang=${idBarang}`);
      const response = await fetch(`https://flask-web-klien-brbk6zo3cq-uc.a.run.app/barang?idBarang=${idBarang}`);
      const data = await response.json();
      setFormData(data.data);
      setLoading(false);
    } catch (error) {
      console.log('Error fetching data:', error);
      setLoading(false);
    }
  }

  const handleInputChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // LOGIC UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform update logic here with formData

    try {
      setLoading(true);
      const updateField = {
          "nama_barang": formData.nama_barang,
          "stock_barang": formData.stock_barang,
          "harga_pokok": formData.harga_pokok,
          "harga_jual": formData.harga_jual
      }
  
      const response = await fetch(
        // `http://localhost:5000/barang/${formData.id_barang}`,
        `https://flask-web-klien-brbk6zo3cq-uc.a.run.app/barang/${formData.id_barang}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updateField),
        }
      );
  
      if (response.ok) {
        navigate(-1)
        // history.goBack();
      } else {
        console.log('Error updating data');
        setLoading(false);
      }
    } catch (error) {
      console.log('Error updating data:', error);
      setLoading(false);
    }
  };



  
  return (  
    <Box
    sx={{ bgcolor: '', ml: 35, mt:2, border:'0px solid'  }}>
      {/* <Container component="main" maxWidth="lg"> */}

        {loading ? (
        <CircularProgress />
        ) : (
          <Box
            sx={{ m: 5, mt:2, border:'0px solid'  }}>
            <AdminSideBar/>

            <AppBarAtas/>

            <Typography sx={{ mt:9, mb:4 }} component="h1" variant="h5" align='center'>
              Update Barang
            </Typography>
  
            <Box component="form" noValidate sx={{ mt: 1 }}>
            {/* <form onSubmit={handleSubmit}> */}
                <TextField
                  label="ID Barang"
                  name="id_barang"
                  value={formData.id_barang}
                  onChange={handleInputChange}
                  fullWidth
                  disabled
                  margin="normal"
              />
              <TextField
                  margin="normal"
                  fullWidth
                  id="nama"
                  label="nama"
                  name="nama_barang"
                  value={formData.nama_barang}
                  onChange={handleInputChange}
                />
              <TextField
                  margin="normal"
                  fullWidth
                  id="stok"
                  label="Stok"
                  name="stock_barang"
                  value={formData.stock_barang}
                  onChange={handleInputChange}
                />
              <TextField
                  margin="normal"
                  fullWidth
                  id="harga-pokok"
                  label="Harga Pokok"
                  name="harga_pokok"
                  value={formData.harga_pokok}
                  onChange={handleInputChange}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    id="harga-jual"
                    label="Harga Jual"
                    name="harga_jual"
                    value={formData.harga_jual}
                    onChange={handleInputChange}
                  />
                <Button type="submit"          
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleSubmit}
                >
                  UPDATE
                </Button>
                
            {/* </form> */}
            </Box>
          </Box>

        )}

    </Box>
  )
}