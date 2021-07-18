import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import Layout from './Layout';
import { ThemeProvider } from '@material-ui/core';
import { theme } from './styles/theme';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Layout />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
