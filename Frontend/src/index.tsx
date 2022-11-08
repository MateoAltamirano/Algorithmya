import { ThemeProvider } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import ArrayProvider from './application/providers/ArrayProvider';
import AuthProvider from './application/providers/AuthProvider';
import GraphProvider from './application/providers/GraphProvider';
import HashTableProvider from './application/providers/HashTableProvider';
import LinkedListProvider from './application/providers/LinkedListProvider';
import QueueProvider from './application/providers/QueueProvider';
import StackProvider from './application/providers/StackProvider';
import UserProvider from './application/providers/UserProvider';
import './presentation/index.css';
import Layout from './presentation/layout/Layout';
import { theme } from './presentation/theme';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGIND_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <UserProvider>
          <SnackbarProvider maxSnack={3}>
            <ArrayProvider>
              <StackProvider>
                <QueueProvider>
                  <LinkedListProvider>
                    <HashTableProvider>
                      <GraphProvider>
                        <Router>
                          <Switch>
                            <Layout />
                          </Switch>
                        </Router>
                      </GraphProvider>
                    </HashTableProvider>
                  </LinkedListProvider>
                </QueueProvider>
              </StackProvider>
            </ArrayProvider>
          </SnackbarProvider>
        </UserProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
