import { combineReducers } from "redux";

import { AppReducer, AppState } from "./AppReducer";
import { userReducer, UserState } from "redux/reducers/UserReducer";
import { InstancesReducer, InstancesState } from "./InstancesReducer";

export interface RootState {
  appState: AppState;
  userState: UserState;
  instancesState: InstancesState;
}

export const rootReducer = combineReducers({
  appState: AppReducer,
  userState: userReducer,
  instancesState: InstancesReducer,
});
