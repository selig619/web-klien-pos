import {useState, useEffect} from 'react';

import AdminSideBar from '../layouts/AdminSideBar';
import MyDataGrid from '../layouts/MyDataGrid';
import {Typography, Container, Stack, TextField, Select, MenuItem, Button, Grid} from '@mui/material';

import Box from '@mui/material/Box';




export default function AnalyticsPage() {

  const [metric, setMetric] = useState("")
  const [support, setSupport] = useState()
  const [metricValue, setmetricValue] = useState("")
  
  const [file, setFile] = useState()

  const handleMetriChange = async (event) => {

  };

  const handleFile = async (event) => {
    setFile(event.target.files[0])
    console.log(event.target.files[0])
  };


  return (

    <Box
    sx={{ bgcolor: '', ml: 35, mt:2, border:'2px solid'  }}>        
      {/* <Container component="main" maxWidth="lg"> */}

        <AdminSideBar>        
        </AdminSideBar>
        <Typography component="h1" variant="h5" align='center'>
          Analytics
        </Typography>
        <Typography component="h4" align='left' my={4}>
          Market Basket Analysis
        </Typography>

        <div>
          <Grid container sx={{ border:'0px solid'}}>
            <Grid item xs={6}   sx={{ border:'0px solid' }} >
              <Stack direction='row' sx={{ border:'0px solid' }} justifyContent={'center'} spacing={4}>
                <Typography >Support</Typography> 
                <TextField 
                  required
                  size='small'
                  id="support"
                  label="Support"
                  name="support"
                  autoFocus
                />
              </Stack>
            </Grid>

            <Grid item xs={6} sx={{ border:'0px solid' }} >
              <Stack direction='row' justifyContent={'center'} spacing={4}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={age}
                  label="Confidence / Lift"
                  onChange={e => setMetric(e.target.value)}
                >
                    <MenuItem selected='True' value={'confidence'}>Confidence</MenuItem>
                    <MenuItem value={'lift'}>Lift</MenuItem>
                </Select>
                <TextField sx={{ my: 'auto', mx:'auto' }}
                  margin="normal"
                  required
                  size='small'
                  id="metric"
                  label="Metric"
                  name="metric"
                  autoFocus
                />
              </Stack>
            </Grid>

            <Grid item  xs={12} sx={{ border:'1px solid', p:4 }}>
              {/* <div style={{margin:'auto', border:'1px solid'}}> */}
                <input style={{marginLeft:'25%'}}
                  accept="csv/*"
                  // className={classes.input}
                  // style={{ display: 'none' }}
                  id="raised-button-file"
                  multiple
                  type="file"
                  name='file'
                  onChange={handleFile}
                />
                {/* <label htmlFor="raised-button-file">
                  <Button variant="contained" component="span" >
                    Upload
                  </Button>
                </label>  */}
              {/* </div> */}

            </Grid>

            <Grid item m="auto" sx={{ border:'0px solid', p:4 }}>
              <Button justifyContent={'center'}
                variant="contained"
              >
                Apply
              </Button>
            </Grid>
          </Grid>

          <MyDataGrid></MyDataGrid>


        </div>

    </Box>

  )
}