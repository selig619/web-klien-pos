import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        MiningMart API
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const tiers = [
  {
    title: 'Free',
    price: '0',
    description: [
      '700 rows limit',
      // '2 GB of storage',
      // 'Help center access',
      // 'Email support',
    ],
    // buttonText: 'Sign up for free',
    buttonVariant: 'outlined',
  },
  {
    title: 'Gold',
    subheader: 'Most popular',
    price: '450K',
    description: [
      '7.000 rows limit',
      'Plan ID : 9FwGgNdBq4KbQlnfXVwL',
      // 'Help center access',
      // 'Priority email support',
    ],
    buttonText: 'Get started',
    buttonVariant: 'contained',
  },
  {
    title: 'Silver',
    price: '300K',
    description: [
      '5.000 rows limit',
      'Plan ID : NdDHJrr5nq4LbyIiIaFX',
      // 'Help center access',
      // 'Phone & email support',
    ],
    // buttonText: 'Contact us',
    // buttonVariant: 'outlined',
  },
];

const footers = [
  {
    title: 'Company',
    description: ['Team', 'History', 'Contact us', 'Locations'],
  },
  {
    title: 'Features',
    description: [
      'Cool stuff',
      'Random feature',
      'Team feature',
      'Developer stuff',
      'Another one',
    ],
  },
  {
    title: 'Resources',
    description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
  },
  {
    title: 'Legal',
    description: ['Privacy policy', 'Terms of use'],
  },
];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function DocumentationPage() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            MiningMart API
          </Typography>
          {/* <nav>
            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={{ my: 1, mx: 1.5 }}
            >
              Features
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={{ my: 1, mx: 1.5 }}
            >
              Enterprise
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={{ my: 1, mx: 1.5 }}
            >
              Support
            </Link>
          </nav>
          <Button href="#" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
            Login
          </Button> */}
          <Button href="https://documenter.getpostman.com/view/19889868/2s93mBvdYz#eca4dd66-eb75-4067-b73e-f597ade287a3" target="_blank" variant={'contained'} sx={{ backgroundColor: "#EF5B25" }} >
            SEE DOCUMENTATION
          </Button>
        </Toolbar>
      </AppBar>
      {/* Hero unit */}
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Premium Pricing
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" component="p">
          Tersedia plan berbayar membuat Anda lebih leluasa untuk menggunakan API 
          dengan limit data yang lebih besar.
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === 'Enterprise' ? 12 : 6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  action={tier.title === 'Pro' ? <StarIcon /> : null}
                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      mb: 2,
                    }}
                  >
                    <Typography component="h2" variant="h3" color="text.primary">
                      Rp{tier.price}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      /6mo
                    </Typography>
                  </Box>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  {/* <Button fullWidth variant={tier.buttonVariant} sx={{ backgroundColor: "#EF5B25" }}> */}
                  {/* <Button fullWidth variant={tier.buttonVariant} >
                    {tier.buttonText}
                  </Button> */}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      {/* Footer */}
      <Container
        maxWidth="md"
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 8,
          py: [3, 6],
        }}
      >
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          {/* <Button component={Link} to="https://documenter.getpostman.com/view/19889868/2s93mBvdYz#eca4dd66-eb75-4067-b73e-f597ade287a3" variant={'contained'} sx={{ backgroundColor: "#EF5B25" }} > */}

          <Typography variant="h5" align="center" color="text." component="p">
            Berikut adalah contoh data transaksi yang telah dilakukan preprocessing untuk bisa langsung diterima oleh API
          </Typography>

          <Button href="https://firebasestorage.googleapis.com/v0/b/ta-supermarket-1f444.appspot.com/o/api_swalayan%2Ftrans-contoh-doc.csv?alt=media&token=df977750-43a4-4bf2-9149-df0a42286abe&_gl=1*rbfhiq*_ga*MTk0NTQ4MTI3NS4xNjYzODQyNjky*_ga_CW55HF8NVT*MTY4NjExNjkyMi4xMzQuMS4xNjg2MTE2OTMyLjAuMC4w" target="_blank" variant={'contained'} sx={{ mt:5 }} >
            DOWNLOAD CSV HERE
          </Button>
        </div>

        {/* <Grid container spacing={4} justifyContent="space-evenly">
          {footers.map((footer) => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map((item) => (
                  <li key={item}>
                    <Link href="#" variant="subtitle1" color="text.secondary">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid> */}
        <Copyright sx={{ mt: 5 }} />
      </Container>
      {/* End footer */}
    </ThemeProvider>
  );
}