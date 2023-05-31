import React from 'react'

import AdminSideBar from '../layouts/AdminSideBar';

import {Box,Typography, Container, Stack, TextField, Select, MenuItem, Button, Grid} from '@mui/material';
import MyDataGrid from '../layouts/MyDataGrid';

function KasirPage() {
  return (
    <>
      <Box
      sx={{ bgcolor: '', ml: 35, mt:2, border:'0px solid'  }}>

          <AdminSideBar>        
          </AdminSideBar>
          <Typography component="h1" variant="h5" align='center'>
            Kasir
          </Typography>

          <Box
            sx={{ m: 8, p: 3, border:'2px solid' }}>
            <Grid container>
              <Grid item xs >
                <Box sx={{bgcolor:'lightblue', border:'2px solid', height: 180}} p={3}>
                  <Grid item md={12}>
                    <Stack sx={{border:'0px solid'}} direction={'row'}>
                      <Typography sx={{my:'auto'}}>
                        Tanggal
                      </Typography>                        
                      <TextField sx={{ml:1}}
                        size='small'
                        id="tanggal_now" label="Tanggal" name="tanggal_now"
                        onChange={() => {} }
                      />
                    </Stack>
                    <Stack sx={{border:'0px solid', mt:3}} direction={'row'}>
                      <Typography sx={{my:'auto'}}>
                        Cashier
                      </Typography>                        
                      <TextField sx={{ml:1}} disabled
                        size='small'
                        id="nama_kasir" label="Kasir" name="nama_kasir"
                        onChange={() => {} }
                      />
                    </Stack>
                  </Grid>                    
                </Box>
              </Grid>
              <Grid item xs sx={{ ml: 2}}>
                <Box sx={{bgcolor:'lightblue', border:'2px solid', height: 180}} p={3}>
                  <Grid item md={12}>
                    <Stack sx={{border:'0px solid'}} direction={'row'}>
                      <Typography sx={{my:'auto'}}>
                        Barang
                      </Typography>

                      {/* SELECT BARANG */}
                      <Select sx={{ml:3, height: 7/8}}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        // value={age}
                        label="Barang"
                        onChange={(e) => {}}
                      >
                          <MenuItem selected='True' value={'confidence'}>Confidence</MenuItem>
                          <MenuItem value={'lift'}>Lift</MenuItem>
                      </Select>
                      <Button
                        onClick={()=>{}}
                        variant="contained"
                        sx={{minHeight: 7/8 , ml: 3}}
                      >Tambah</Button>
                    </Stack>
                    <Stack sx={{border:'0px solid', mt:3}} direction={'row'}>
                      <Typography sx={{my:'auto'}}>
                        Cashier
                      </Typography>                        
                      <TextField sx={{ml:1}} disabled
                        size='small'
                        id="nama_kasir" label="Kasir" name="nama_kasir"
                        onChange={() => {} }
                      />
                    </Stack>
                  </Grid>                    
                </Box>
              </Grid>
              <Grid item xs sx={{ ml: 2}}>
                <Box sx={{ml: 2, my:'auto', bgcolor:'lightblue', border:'2px solid', height: 180, maxWidth:7/8}} p={3}>
                 <Typography sx={{}} variant='h3' >
                    120.000
                  </Typography> 
                </Box>
              </Grid>
            </Grid>            
            
            <Box
            sx={{ mt: 5, p: 3, border:'2px solid' }}>
              <MyDataGrid sx={{mt: 5}}
                rows={[
                  {'id':'aaa','umur':12},{'id':'bbbb','umur':54}
                ]}
                columns={
                  [
                    {field : 'id', headerName: "ID"},
                    {field : 'umur', headerName: "Umur"},                  
                  ]
                }
              >
              </MyDataGrid>
            </Box>

            
            <Grid container sx={{mt : 5, height: 300}}>
              {/* CASH CHANGE */}
              <Grid item xs >
                <Box sx={{bgcolor:'lightblue', border:'2px solid', height: 180}} p={3}>
                  
                  <Grid item md={12}>
                    <Box sx={{p:1, bgcolor:'lightblue', border:'0px solid', height: 7/8}}>
                      <Stack sx={{border:'0px solid'}} direction={'row'}>
                        <Typography sx={{my:'auto'}}>
                          Cash
                        </Typography>                        
                        <TextField sx={{ml:1}}
                          size='small'
                          id="jum_bayar" label="Cash" name="jum_bayar"
                          onChange={() => {} }
                        />
                      </Stack>
                      <Stack sx={{border:'0px solid', mt:3}} direction={'row'}>
                        <Typography sx={{my:'auto'}}>
                          Change
                        </Typography>                        
                        <TextField sx={{ml:1}} disabled
                          size='small'
                          id="jum_kembali" label="Change" name="jum_kembali"
                          onChange={() => {} }
                        />
                      </Stack>
                    </Box>
                  </Grid>
                  
                </Box>
              </Grid>  

              {/* NOTEEEEE */}            
              <Grid item xs >

                <Box sx={{ml: 2, bgcolor:'lightblue', border:'2px solid', height: 180}} p={3}>
                  <TextField  multiline
                    size='medium'
                    id="note" label="Note" name="note"
                    autoFocus
                    onChange={() => {} }
                  />
                </Box>

              </Grid>

              {/* TOMBOL KANAN BWH */}
              <Grid item xs sx={{ml: 2}} >
                
                <Grid item md={12}>
                  <Box sx={{p:1, bgcolor:'lightblue', border:'2px solid', height: 60}}>
                    <Button
                      onClick={()=>{}}
                      fullWidth
                      variant="contained"
                      sx={{ minHeight: 7/8 }}
                    >RESET</Button>
                  </Box>
                </Grid>
                <Grid item md={12}>
                  <Box sx={{p:1, bgcolor:'lightblue', border:'2px solid', height:100}} >
                    <Button
                      onClick={()=>{}}
                      fullWidth
                      variant="contained"
                      sx={{minHeight: 7/8 }}
                    >PROSES</Button>
                  </Box>                  
                </Grid>

              </Grid>
              {/* END TOMBOL KANAN BWH */}

            </Grid>

          </Box>

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