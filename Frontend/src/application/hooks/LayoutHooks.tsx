import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { userService } from '../../infrastructure/api/services/userService';
import { useAuth } from '../providers/AuthProvider';
import { useUser } from '../providers/UserProvider';
import { AuthActionType } from '../reducers/authReducer';

const useLayoutHook = () => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { dispatch: userDispatch } = useUser();
  const { dispatch: authDispatch } = useAuth();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    const getUser = async () => {
      const email: string | null = localStorage.getItem('email');
      if (email) {
        const success: boolean = await userService.getUser(
          email,
          userDispatch,
          history
        );
        if (success) {
          authDispatch({
            type: AuthActionType.SignIn,
            payload: { isAuth: true, errors: [] },
          });
          history.push('/', 0);
        }
      }
      setIsLoading(false);
    };
    getUser();
  }, [history, userDispatch, authDispatch]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMoreClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMoreClose = () => {
    setAnchorEl(null);
  };

  return {
    handleDrawerToggle,
    handleMoreClick,
    handleMoreClose,
    open,
    anchorEl,
    mobileOpen,
    isLoading,
  };
};

export default useLayoutHook;
