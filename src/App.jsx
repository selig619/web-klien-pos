import SignIn from './pages/LoginPage';
import { CssBaseline } from '@mui/material';
import MyRoutes from './routes/MyRoutes';


function App() {

    // SIMPLET GETTT
  // await fetch('https://flask-web-klien-brbk6zo3cq-uc.a.run.app/index')
  // .then(res => res.json())
  // .then(data => {
  //     console.log(data);
  // })
  // .catch(err => console.log(err))




  return (
    <>
      {/* <CssBaseline/> */}
      <MyRoutes/>
    </>
  );



}

export default App;
