import { Drawer, Hidden, List, useTheme } from '@material-ui/core';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useStyles } from '../../../presentation/theme';
import { useAuth } from '../../providers/AuthProvider';
import { useLayout } from '../../providers/LayoutProvider';
import { LayoutActionType } from '../../reducers/layoutReducer';
import { ALGORITHMYA_MODULES } from '../../utils/constants';
import './Drawer.css';
import DrawerItem from './DrawerItem';

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
  const {
    state: { isAuth },
  } = useAuth();
  const history = useHistory();
  const { dispatch } = useLayout();
  const container = () => document.body;
  const drawer = (
    <>
      <div className={classes.toolbar} />
      <List>
        {ALGORITHMYA_MODULES.map((item, idx) =>
          !item.isPrivate || isAuth ? (
            <DrawerItem
              key={idx}
              text={item.text}
              route={item.route}
              idx={idx}
              icon={item.icon}
            />
          ) : undefined
        )}
      </List>
    </>
  );

  useEffect(() => {
    const idx: number = history.location.state
      ? Number(history.location.state)
      : 0;
    dispatch({ type: LayoutActionType.UpdatePageIdx, payload: idx });
  }, [dispatch, history.location.state]);

  useEffect(() => {
    history.listen((location) => {
      const idx: number = Number(location.state);
      dispatch({ type: LayoutActionType.UpdatePageIdx, payload: idx });
    });
  }, [dispatch, history]);

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
