import {useState, useEffect} from 'react';

import AdminSideBar from '../layouts/AdminSideBar';
import MyDataGrid from '../layouts/MyDataGrid';
import {Typography, CircularProgress} from '@mui/material';
import Box from '@mui/material/Box';
import KasirSideBar from '../layouts/KasirSideBar';
import AppBarAtas from '../layouts/AppBarAtas';

export default function LaporanPage() {
  const [userRole, setUserRole] = useState('');

  const [laporan, setLaporan] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    cekRoleSideBar();

    fetchData();
  }, []);

  const cekRoleSideBar = () =>{
    const role = localStorage.getItem('role');
    setUserRole(role);
  }

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('https://flask-web-klien-brbk6zo3cq-uc.a.run.app/detail-transaksi');
      // const response = await fetch('http://localhost:5000/detail-transaksi');
      const jsonData = await response.json();
      const result = jsonData.data
      // console.log(result);

      const newTrans = (result).map(e=>{
        // console.log(e)
        const tgl = e.tgl_htrans
        return{
          tgl_htrans : new Date( tgl ), 
          id_transaksi : e.id_transaksi, 
          id_barang : e.id_barang, 
          nama_barang : e.nama_barang, 
          jumlah : e.jumlah, 
          harga : e.harga,
          total : e.total
        }
      })
      const dataWithId = newTrans.map((item, index) => ({
        id: parseInt(index) + 1, // Add 1 to index to start the ordered number from 1
        ...item,
      }));
      console.log(dataWithId);

      setLaporan(dataWithId);

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

        {userRole === 'admin' && <AdminSideBar/>} 
        {userRole === 'kasir' && <KasirSideBar/>}

        <AppBarAtas/>

        {isLoading ? (
          <CircularProgress /> 
        ) : (
          <Box
            sx={{ m: 5, border:'0px solid'  }}>
            <Typography sx={{ mt:9, mb:4 }} component="h1" variant="h5" align='center'>
              Laporan Penjualan
            </Typography>

            <MyDataGrid
              rows={ laporan }
              columns={[
                {field : 'id', headerName: "No", width: 10},
                {field : 'tgl_htrans', type: "dateTime", headerName: "Tanggal", width: 180},
                {field : 'id_transaksi', type: "string",  headerName: "ID Transaksi", width: 180},
                {field : 'id_barang', type: "string",  headerName: "ID Barang", width: 150},
                {field : 'nama_barang', type: "string",  headerName: "Nama Barang", width: 180},
                {field : 'jumlah', type: "number",  headerName: "Jumlah", width: 80},
                {field : 'harga', type: "number",  headerName: "Harga", width: 80},
                {field : 'total', type: "number", headerName: "Total", width: 80},
              ]}
            >
            </MyDataGrid>
          </Box>
        )}

    </Box>

  )
}