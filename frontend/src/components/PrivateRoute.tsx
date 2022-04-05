import { User } from "interfaces/User";
import { connect } from "react-redux";
import { Redirect, Route, RouteProps } from "react-router";

import { RootState } from "redux/reducers/RootReducer";

interface MappedProps {
  is_authorised: boolean;
}
export interface PrivateRouteProps extends RouteProps, MappedProps {
  adminOnly?: boolean;
}

const mapStateToProps = (state: RootState): MappedProps => ({
  is_authorised: state.userState.is_authorised,
});

export const PrivateRoute = connect(mapStateToProps)(
  ({ is_authorised, adminOnly, ...props }: PrivateRouteProps) => {
    const userString = localStorage.getItem("user");

    if (userString) {
      const obj = JSON.parse(userString) as User;
      if (adminOnly && !obj.admin) {
        return <Redirect to="/" />;
      } else {
        return <Route {...props} />;
      }
    }

    if (!is_authorised) {
      return <Redirect to="/" />;
    } else {
      return <Route {...props} />;
    }
  }
);
