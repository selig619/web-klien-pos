import {useState, useEffect} from 'react';

import AdminSideBar from '../layouts/AdminSideBar';
import MyDataGrid from '../layouts/MyDataGrid';
import {Typography, CircularProgress, Stack, TextField, Select, MenuItem, Button, Grid} from '@mui/material';

import Box from '@mui/material/Box';
import AppBarAtas from '../layouts/AppBarAtas';

export default function AnalyticsMBAPage() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [file, setFile] = useState(null)
  const [metric, setMetric] = useState("")
  const [support, setSupport] = useState()
  const [metricValue, setmetricValue] = useState()
  const [token, setToken] = useState("")
  const [dataMBA, setDataMBA] = useState([])
  const [imageUrl, setImageUrl] = useState('');

  const handleUpload = async () => {
    // event.preventDefault();

    // console.log('support',support)
    // console.log('metric',metric)
    // console.log('metricValue',metricValue)
    // console.log(token);
    // console.log(file);

    // formData MBA
    const formData = new FormData()
    formData.append('file',file)
    formData.append('name','supermarket 1')
    formData.append('method','apriori')
    formData.append('minSupp',support)
    formData.append('metric',metric)
    formData.append('metric_value',metricValue)

    // for (var [key, value] of formData.entries()){
    //   console.log(key,value);
    // }

    //GET ARM
    try {
      setIsLoading(true);
      const response = await fetch("https://api-swalayan-brbk6zo3cq-as.a.run.app/arm-csv", {
        method: "POST",
        body: formData,
        headers: {
          'authorization' : token
        //   // 'Content-Type': 'application/json',
        //   'Content-Type': 'multipart/form-data',
        },
      });
      const jsonData = await response.json();
      console.log(jsonData);
      setDataMBA([]);
  
      if (!response.ok) {
        console.log(jsonData.message);
        alert(jsonData.message);
        throw new Error(jsonData.message || 'Error fetching data');
      }
      // else{
        const result = jsonData.rules
        const dataMBAwID = result.map((item, index) => ({
          id: parseInt(index) + 1, 
          ...item,
        }));
        setDataMBA(dataMBAwID);

        if (jsonData.rules_graph) {
          setImageUrl(jsonData.rules_graph);
        } else {
          setImageUrl('');
        }
        // console.log(imageUrl)

        handleAlertClose();
        setIsLoading(false);
      // }
    } catch (err) {
      setError(err.message);      
      // console.log('Error fetching data:', err);
      // alert(err);
    } finally {
      // console.log('Error fetching data:');
      setIsLoading(false);
    }
  };

  const handleAlertClose = () => {
    setError(null);
  };

  return (
<>
  <AdminSideBar></AdminSideBar>
  
    <Box
    sx={{ bgcolor: '', ml: 35, border:'0px solid'  }}>        
      {/* <Container component="main" maxWidth="lg"> */}
        <AppBarAtas/>

        <Typography sx={{ mt:11, mb:4 }} component="h1" variant="h5" align='center'>
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

            <Grid item p={5} sx={{ border:'0px solid' ,m:'auto', width:'100%' }} justifyContent={'center'}>
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
            <Grid item  xs={12} sx={{ border:'0px solid', p:4 }}>
              {/* <div style={{margin:'auto', border:'1px solid'}}> */}
                <input style={{marginLeft:'25%'}}
                  // accept="csv/*"
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
          {isLoading ? (
            <CircularProgress /> 
          ) : (
            <>
              {
                <MyDataGrid
                  rows={ dataMBA }
                  columns={[
                    {field : 'id', headerName: "No", width: 10},
                    {field : 'antecedents', type: "string", headerName: "Antecedents", width: 400},
                    {field : 'consequents', type: "string",  headerName: "Consequents", width: 400},
                    {field : 'confidence', type: "number", headerName: "Confidence", width: 80},
                    {field : 'lift', type: "number", headerName: "Lift", width: 30},                    
                    {field : 'count_on_transactions', type: "number", headerName: "Count on Trans", width: 80},
                  ]}
                ></MyDataGrid>
              }

              {imageUrl && (
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                  <img src={imageUrl} alt="Visualization" style={{ maxWidth: '100%', maxHeight: '300px' }} />
                </div>
              )}

              {error && (
                <div>
                  <p>Error: {error}</p>
                  <Button variant="contained" onClick={handleAlertClose}>
                    Close
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
    </Box>
</>
  )
}