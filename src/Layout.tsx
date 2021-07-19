import {
  CssBaseline,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import { Menu } from '@material-ui/icons';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ResponsiveDrawer from './components/ResponsiveDrawer';
import HomePage from './HomePage';
import ArrayPage from './modules/Array/ArrayPage';
import QueuePage from './modules/Queue/QueuePage';
import StackPage from './modules/Stack/StackPage';
import LayoutProvider from './providers/LayoutProvider';
import './styles/Layout.css';
import { useStyles } from './styles/theme';

const Layout = () => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Router>
        <LayoutProvider>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <Hidden smUp>
                <IconButton
                  color="inherit"
                  edge="start"
                  onClick={() => handleDrawerToggle()}
                  className={classes.menuButton}
                >
                  <Menu />
                </IconButton>
              </Hidden>
              <Typography variant="h6">Algorithmya</Typography>
            </Toolbar>
          </AppBar>
          <nav className={classes.drawer}>
            <ResponsiveDrawer
              mobileOpen={mobileOpen}
              handleDrawerToggle={handleDrawerToggle}
            />
          </nav>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <div className="content">
              <Switch>
                <Route exact path="/">
                  <HomePage />
                </Route>
                <Route path="/array">
                  <ArrayPage />
                </Route>
                <Route path="/stack">
                  <StackPage />
                </Route>
                <Route path="/queue">
                  <QueuePage />
                </Route>
              </Switch>
            </div>
          </main>
        </LayoutProvider>
      </Router>
    </div>
  );
};

export default Layout;
