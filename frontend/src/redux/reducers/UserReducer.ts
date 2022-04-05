import { AnyAction } from "redux";

import { User } from "interfaces/User";

export interface UserState {
  user?: User;
  is_authorised: boolean;
}

const INITIAL_STATE: UserState = {
  user: undefined,
  is_authorised: false,
};

export const userReducer = (
  state: UserState = INITIAL_STATE,
  action: AnyAction
): UserState => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
        is_authorised: true,
      };
    case "DELETE_USER":
      return {
        ...state,
        user: undefined,
        is_authorised: false,
      };
    default:
      return state;
  }
};
