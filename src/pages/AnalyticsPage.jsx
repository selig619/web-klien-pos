import {useState, useEffect} from 'react';

import AdminSideBar from '../layouts/AdminSideBar';
import MyDataGrid from '../layouts/MyDataGrid';
import {Typography, Container, Stack, TextField, Select, MenuItem, Button, Grid} from '@mui/material';

import Box from '@mui/material/Box';




export default function AnalyticsPage() {

  const [metric, setMetric] = useState("")
  const [support, setSupport] = useState()
  const [metricValue, setmetricValue] = useState()
  const [token, setToken] = useState("")
  
  const [file, setFile] = useState()
  // const handleFile = async (event) => {
  //   setFile(event.target.files[0])
  //   console.log(event.target.files[0])
  // };

  const handleUpload = async (event) => {
    event.preventDefault();

    // console.log('support',support)
    // console.log('metric',metric)
    // console.log('metricValue',metricValue)
    // console.log(token);
    // console.log(file);

    const formData = new FormData()
    formData.append('file',file)
    formData.append('name','supermarket 1')
    formData.append('method','apriori')
    formData.append('minSupp',support)
    formData.append('metric',metric)
    formData.append('metric_value',metricValue)

    for (var [key, value] of formData.entries()){
      console.log(key,value);
    }

    // console.log(formData);

    //GET ARM
    // fetch(
    //   'https://api-swalayan-brbk6zo3cq-as.a.run.app/arm-csv',
    //   {
    //     method:'POST',
    //     body: formData,
    //     headers: {
    //       'Accept': '*/*',
    //       'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
    //       'authorization' : token
    //     },
    //   }      
    // ).then(response=>response.json().then(
    //   (data) => {
    //         console.log(data);
    //     })
    // ).catch(err => {console.log(err)})

    try {
      const response = await fetch("https://api-swalayan-brbk6zo3cq-as.a.run.app/arm-csv", {
      // const response = await fetch("http://localhost:5000/arm-csv", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': '*/*',
          'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
          'authorization' : token
        },
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log(result);
        // setAllPosts(result.data.reverse());
      }
    } catch (err) {
      alert(err);
    } finally {
      // setLoading(false);
    }



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
                  onChange={e => setSupport(e.target.value)}
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
                  onChange={e => setmetricValue(e.target.value)}
                />
              </Stack>
            </Grid>

            <Grid item p={5} sx={{ border:'1px solid' ,m:'auto', width:'100%' }} justifyContent={'center'}>
              {/* <Stack direction='row' justifyContent={'center'} spacing={4}> */}
                <TextField sx={{ my: 'auto', mx:'auto', width:'90%' }}
                  margin="normal"
                  required
                  size='small'
                  id="token"
                  label="token"
                  name="token"
                  autoFocus
                  onChange={e => setToken(e.target.value)}
                />
              {/* </Stack> */}
            </Grid>

            {/*  FILEEEEEEEEEEEEEEEEEEEEEEEEEE */}
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
                  onChange={e => setFile(e.target.files[0])}
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
                onClick={handleUpload}
              >
                Apply
              </Button>
            </Grid>
          </Grid>

          <MyDataGrid
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


        </div>

    </Box>

  )
}