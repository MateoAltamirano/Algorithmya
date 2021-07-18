import { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import { useStyles } from './styles/theme';
import ResponsiveDrawer from './components/ResponsiveDrawer';
import {
  CssBaseline,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './HomePage';
import ArrayPage from './modules/Array/ArrayPage';
import StackPage from './modules/Stack/StackPage';
import QueuePage from './modules/Queue/QueuePage';

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
        <nav className={classes.drawer} aria-label="mailbox folders">
          <ResponsiveDrawer
            mobileOpen={mobileOpen}
            handleDrawerToggle={handleDrawerToggle}
          />
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
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
        </main>
      </Router>
    </div>
  );
};

export default Layout;
