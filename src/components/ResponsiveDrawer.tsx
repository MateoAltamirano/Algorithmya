import { Drawer, Hidden, List, useTheme } from '@material-ui/core';
import DrawerItem from './DrawerItem';
import { useStyles } from '../styles/theme';
import '../styles/Drawer.css';

const DRAWER_ITEMS = [
  { label: 'Array', route: 'array' },
  { label: 'Stack', route: 'stack' },
  { label: 'Queue', route: 'queue' },
];

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
        {DRAWER_ITEMS.map((item, index) => (
          <DrawerItem key={index} label={item.label} route={item.route} />
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
