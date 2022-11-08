import {
  CircularProgress,
  CssBaseline,
  Hidden,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import {
  AccountCircle,
  ExitToApp,
  Menu as MenuIcon,
  MoreVert,
} from '@material-ui/icons';
import { Route } from 'react-router-dom';
import ResponsiveDrawer from '../../application/components/drawer/ResponsiveDrawer';
import PrivateRoute from '../../application/components/PrivateRoute';
import useAuthHook from '../../application/hooks/AuthHooks';
import useLayoutHook from '../../application/hooks/LayoutHooks';
import useUserHook from '../../application/hooks/UserHooks';
import { useAuth } from '../../application/providers/AuthProvider';
import LayoutProvider from '../../application/providers/LayoutProvider';
import { useUser } from '../../application/providers/UserProvider';
import ArrayPage from '../array/ArrayPage';
import GraphPage from '../graph/GraphPage';
import HashTablePage from '../hashTable/HashTablePage';
import HomePage from '../home/HomePage';
import LinkedListPage from '../linkedList/LinkedListPage';
import QueuePage from '../queue/QueuePage';
import SignInPage from '../signIn/SignInPage';
import SignUpPage from '../signUp/SignUpPage';
import StackPage from '../stack/StackPage';
import { useStyles } from '../theme';
import './Layout.css';

const Layout = () => {
  const classes = useStyles();
  const {
    state: { isAuth },
  } = useAuth();
  const {
    state: { name: username },
  } = useUser();
  const {
    handleDrawerToggle,
    handleMoreClick,
    handleMoreClose,
    open,
    mobileOpen,
    anchorEl,
    isLoading,
  } = useLayoutHook();
  const {
    email,
    setEmail,
    password,
    setPassword,
    signIn,
    signOut,
    isLoading: signInIsLoading,
  } = useAuthHook();
  const {
    name,
    setName,
    signUp,
    isLoading: signUpIsLoading,
  } = useUserHook(email, password);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <LayoutProvider>
        <AppBar className={classes.appBar}>
          <Toolbar style={{ justifyContent: 'space-between' }}>
            <Hidden smUp>
              <IconButton
                color="inherit"
                edge="start"
                onClick={handleDrawerToggle}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
            </Hidden>
            <Typography variant="h6">Algorithmya</Typography>
            {isAuth ? (
              <div>
                <Tooltip title="More">
                  <IconButton
                    color="inherit"
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={(e) => handleMoreClick(e)}
                  >
                    <MoreVert />
                  </IconButton>
                </Tooltip>
                <Menu anchorEl={anchorEl} open={open} onClose={handleMoreClose}>
                  <MenuItem>
                    <ListItemIcon>
                      <AccountCircle fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>{username}</ListItemText>
                  </MenuItem>
                  <MenuItem onClick={() => signOut(handleMoreClose)}>
                    <ListItemIcon>
                      <ExitToApp fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Sign Out</ListItemText>
                  </MenuItem>
                </Menu>
              </div>
            ) : undefined}
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
            {isLoading ? (
              <CircularProgress style={{ color: 'var(--color-primary)' }} />
            ) : (
              <>
                <Route path="/sign-in">
                  <SignInPage
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    signIn={signIn}
                    isLoading={signInIsLoading}
                  />
                </Route>
                <Route path="/sign-up">
                  <SignUpPage
                    name={name}
                    setName={setName}
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    signUp={signUp}
                    isLoading={signUpIsLoading}
                  />
                </Route>
                <PrivateRoute exact path="/" component={HomePage} />
                <PrivateRoute path="/array" component={ArrayPage} />
                <PrivateRoute path="/stack" component={StackPage} />
                <PrivateRoute path="/queue" component={QueuePage} />
                <PrivateRoute path="/linked-list" component={LinkedListPage} />
                <PrivateRoute path="/hash-table" component={HashTablePage} />
                <PrivateRoute path="/graph" component={GraphPage} />
              </>
            )}
          </div>
        </main>
      </LayoutProvider>
    </div>
  );
};

export default Layout;
