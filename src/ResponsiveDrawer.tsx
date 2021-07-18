import {
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@material-ui/core';
import { Inbox, Mail } from '@material-ui/icons';
import { useStyles } from './styles/theme';

type ResponsiveDrawerProps = {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
};

const ResponsiveDrawer = ({
  mobileOpen,
  handleDrawerToggle,
}: ResponsiveDrawerProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const container = () => document.body;
  const drawer = (
    <>
      <div className={classes.toolbar} />
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <Inbox /> : <Mail />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </>
  );

  return (
    <>
      <Hidden smUp implementation="css">
        <Drawer
          container={container}
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </>
  );
};

export default ResponsiveDrawer;
