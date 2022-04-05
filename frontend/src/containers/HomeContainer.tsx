import { connect } from "react-redux";

import { RootState } from "redux/reducers/RootReducer";
import { UserState } from "redux/reducers/UserReducer";
import { DashboardContainer } from "./DashboardContainer";

const mapStateToProps = (state: RootState): UserState => ({
  ...state.userState,
});

export const HomeContainer = connect(mapStateToProps)(
  ({ is_authorised }: UserState) => {
    return !is_authorised ? (
      <div>
        <p>Not currently authorised.</p>
      </div>
    ) : (
      <DashboardContainer />
    );
  }
);
