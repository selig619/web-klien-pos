import * as React from 'react';
import { useNavigate,BrowserRouter, Route, Routes } from 'react-router-dom';

import SignIn from "../pages/LoginPage";

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Button from '@mui/material/Button';
import ListItemText from '@mui/material/ListItemText';
import Link from '@mui/material/Link';
import MailIcon from '@mui/icons-material/Mail';

const drawerWidth = 240;

export default function AdminSideBar() {
  const navigate = useNavigate();

  const handleKlik = () =>{
    navigate("/hahaha")
    console.log("haloo");
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, mr: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Permanent drawer
          </Typography>
        </Toolbar>
      </AppBar> */}
      {/* <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
          enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
          imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
          Convallis convallis tellus id interdum velit laoreet id donec ultrices.
          Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
          nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
          leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
          feugiat vivamus at augue. At augue eget arcu dictum varius duis at
          consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
          sapien faucibus et molestie ac.
        </Typography>
      </Box> */}      
      
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          <ListItem key={'transaksi'} disablePadding>
            <ListItemButton onClick={()=> navigate("/transaksi")}>
              <ListItemText primary={'Transaksi Penjualan'} />
            </ListItemButton>
          </ListItem>
        </List>
        <List>
          <ListItem key={'laporan'} disablePadding>
            <ListItemButton onClick={()=> navigate("/laporan")}>
              <ListItemText primary={'Laporan Penjualan'} />
            </ListItemButton>
          </ListItem>
        </List>
        <List>
          <ListItem key={'barang'} disablePadding>
            <ListItemButton onClick={()=> navigate("/barang")}>
              <ListItemText primary={'Master Barang'} />
            </ListItemButton>
          </ListItem>
        </List>
        <List>
          <ListItem key={'mba'} disablePadding>
            <ListItemButton onClick={()=> navigate("/mba")}>
              <ListItemText primary={'Market Basket Analysis'} />
            </ListItemButton>
          </ListItem>
        </List>
        <List>
          <ListItem key={'clustering'} disablePadding>
            <ListItemButton onClick={()=> navigate("/clustering")}>
              <ListItemText primary={'Clustering'} />
            </ListItemButton>
          </ListItem>
        </List>

        <List>
          <ListItem key={'logout'} disablePadding>
            <ListItemButton onClick={()=>{
              localStorage.clear();
              navigate("/login")
            } }>
              <ListItemText primary={'Logout'} />
            </ListItemButton>
          </ListItem>
        </List>        

      </Drawer>
    </Box>
  );
}