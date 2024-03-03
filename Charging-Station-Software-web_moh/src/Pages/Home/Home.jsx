import React from 'react';
import { Container, CssBaseline } from '@mui/material';
import { AppHeader, HomeComponent, Footer } from '../../index';


const containerStyle = {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  
};

const Home = () => {
  return (
    <div style={containerStyle}>
      <CssBaseline />
      <AppHeader />
      <div style={{ flex: 1}}>
        <HomeComponent />
      </div>
      <Footer />
    </div>
  );
};

export default Home;