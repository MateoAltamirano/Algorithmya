import { ComponentType } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';

type PrivateRouteProps = {
  component: ComponentType;
} & RouteProps;

const PrivateRoute = ({ component: Component, ...rest }: PrivateRouteProps) => {
  const {
    state: { isAuth },
  } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        return isAuth ? <Component {...props} /> : <Redirect to="/sign-in" />;
      }}
    />
  );
};

export default PrivateRoute;
