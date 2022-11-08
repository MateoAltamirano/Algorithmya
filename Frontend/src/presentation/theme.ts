import {
  makeStyles,
  Theme,
  createStyles,
  createTheme,
} from '@material-ui/core/styles';
import { APP_BAR_HEIGHT, DRAWER_WIDTH } from '../application/utils/constants';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      height: '100%',
      maxHeight: '100%',
      overflow: 'auto',
      backgroundColor: 'whitesmoke',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: DRAWER_WIDTH,
        flexShrink: 0,
        backgroundColor: 'var(--color-secondary)',
      },
    },
    appBar: {
      [theme.breakpoints.up('sm')]: {
        width: '100%',
        zIndex: theme.zIndex.drawer + 1,
      },
      backgroundColor: 'var(--color-secondary)',
      userSelect: 'none',
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
      backgroundColor: 'var(--color-secondary)',
    },
    content: {
      display: 'flex',
      minHeight: `calc(100% - ${APP_BAR_HEIGHT}px)`,
      minWidth: `calc(100% - ${DRAWER_WIDTH}px)`,
      [theme.breakpoints.down('xs')]: {
        minWidth: '100%',
      },
      marginTop: `${APP_BAR_HEIGHT}px`,
      padding: theme.spacing(2),
      backgroundColor: 'whitesmoke',
    },
    accordion: {
      borderRadius: '5px',
      backgroundColor: 'whitesmoke',
    },
    accordionSummary: {
      backgroundColor: 'var(--color-primary-accent)',
      color: 'white',
      boxShadow: theme.shadows[1],
      borderRadius: '5px',
    },
    textField: {
      width: '100%',
      '& .MuiOutlinedInput-input': {
        paddingLeft: '5px',
        paddingRight: '5px',
      },
      '& .MuiOutlinedInput-root': {
        height: '40px',
        '& fieldset': {
          border: 'none',
        },
        '&.Mui-focused fieldset': {
          border: 'none',
        },
      },
    },
    button: {
      color: 'white',
      textTransform: 'none',
      minWidth: 'auto',
      textAlign: 'center',
      backgroundColor: 'var(--color-secondary)',
      '&:hover': {
        backgroundColor: 'var(--color-secondary-dark)',
      },
    },
  })
);

export const theme = createTheme({
  typography: {
    fontFamily: [
      'Lorin',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Oxygen',
      'Ubuntu',
      'Cantarell',
      'Fira Sans',
      'Droid Sans',
      'Helvetica Neue',
      'sans-serif',
    ].join(','),
  },
});
