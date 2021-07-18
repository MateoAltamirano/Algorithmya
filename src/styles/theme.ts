import {
  makeStyles,
  Theme,
  createStyles,
  createTheme,
} from '@material-ui/core/styles';

const DRAWER_WIDTH = 240;

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      minHeight: '100%',
      overflow: 'auto',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: DRAWER_WIDTH,
        flexShrink: 0,
        backgroundColor: theme.palette.secondary.dark,
      },
    },
    appBar: {
      [theme.breakpoints.up('sm')]: {
        width: '100%',
        zIndex: theme.zIndex.drawer + 1,
      },
      backgroundColor: theme.palette.secondary.dark,
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: DRAWER_WIDTH,
      backgroundColor: theme.palette.secondary.dark,
    },
    content: {
      minHeight: '100%',
      padding: theme.spacing(3),
    },
  })
);

export const theme = createTheme({
  palette: {
    primary: {
      main: '#26a69a',
      light: '#c5e1a5',
      dark: '#1a4a5a',
    },
    secondary: {
      main: '#0e2c40',
      light: '#efbc75',
      dark: '#323c52',
    },
  },
});
