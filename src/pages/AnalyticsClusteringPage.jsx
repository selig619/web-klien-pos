import {useState, useEffect} from 'react';

import AdminSideBar from '../layouts/AdminSideBar';
import MyDataGrid from '../layouts/MyDataGrid';
import {Typography, CircularProgress, Stack, TextField, Select, MenuItem, Button, Grid} from '@mui/material';

import Box from '@mui/material/Box';

export default function AnalyticsMBAPage() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [file, setFile] = useState()
  const [cluster, setCluster] = useState(0)
  const [token, setToken] = useState("")
  const [dataCluster, setDataCluster] = useState([])
  

  const handleUploadClustering = async (event) => {
    event.preventDefault();

    // console.log('support',support)
    // console.log('metric',metric)
    // console.log('metricValue',metricValue)
    // console.log(token);
    // console.log(file);

    // formData clustering
    const formData = new FormData()
    formData.append('file',file)
    formData.append('name','supermarket 1')

    for (var [key, value] of formData.entries()){
      console.log(key,value);
    }

    try {
      setIsLoading(true);
      const response = await fetch(`https://api-swalayan-brbk6zo3cq-as.a.run.app/clusters-csv?cluster=${cluster}`, {
      // const response = await fetch(`http://localhost:5000/clusters-csv?cluster=${cluster}`, {
        method: "POST",
        body: formData,
        headers: {
          'authorization' : token
        //   // 'Accept': "multipart/form-data",
        //   // 'Content-Type': 'application/json',
        //   'Content-Type': 'multipart/form-data',          
        },
      });
      const jsonData = await response.json();
      console.log(jsonData);
  
      if (!response.ok) {        
        setDataCluster([]);
        console.log(jsonData.message);
        alert(jsonData.message);
        throw new Error(jsonData.message || 'Error fetching data');
      }
      // else{
        const result = jsonData.clusters_data
        const dataClusterwID = result.map((item, index) => ({
          id: parseInt(index) + 1, 
          ...item,
        }));
        setDataCluster(dataClusterwID);
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
{/* <Box sx={{width:1/2}}> */}
  <AdminSideBar>
  </AdminSideBar>
{/* </Box> */}
  
    <Box
    sx={{ bgcolor: '', ml: 35, mt:2, border:'0px solid'  }}>        
      {/* <Container component="main" maxWidth="lg"> */}

        <Typography component="h1" variant="h5" align='center'>
          Analytics
        </Typography>
        <Typography component="h4" align='left' my={4}>
          Clustering
        </Typography>

        <div>
          <Grid container sx={{ border:'0px solid'}}>
            <Typography sx={{ ml:5}} >Cluster</Typography> 
            <TextField sx={{ ml:3}}
              required
              size='small'
              id="support"
              label="Cluster"
              name="cluster"
              autoFocus
              onChange={e => setCluster(e.target.value)}
            />

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
                onClick={handleUploadClustering}
              >Apply
              </Button>
            </Grid>
          </Grid>
          {isLoading ? (
            <CircularProgress /> 
          ) : (
            <>
              {
              <MyDataGrid
                rows={ dataCluster }
                columns={[
                  {field : 'id', headerName: "No", width: 10},
                  {field : 'recency', type: "number", headerName: "Recency", width: 80},
                  {field : 'r_score', type: "number", headerName: "R_Score", width: 80},
                  {field : 'frequency', type: "number", headerName: "Frequency", width: 80},
                  {field : 'f_score', type: "number", headerName: "F_Score", width: 80},
                  {field : 'monetary', type: "number", headerName: "Monetary", width: 80},
                  {field : 'm_score', type: "number", headerName: "M_Score", width: 80},
                  {field : 'cust_id', type: "string", headerName: "ID Customer", width: 150},
                  {field : 'cluster', type: "number", headerName: "Cluster", width: 80},   
                ]}
              ></MyDataGrid>
              }
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