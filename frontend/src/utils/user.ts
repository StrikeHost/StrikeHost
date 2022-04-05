import { Dispatch } from "redux";

import { api } from "./api";
import { User } from "interfaces/User";
import { deleteUser, setUser } from "redux/actions/UserActions";

/**
 * Refetches the current user
 *
 * @param {Dispatch} dispatch
 */
export const refetchUser = async (dispatch: Dispatch): Promise<void> => {
  try {
    const { data: user } = await api.get<User>("/user");
    dispatch(setUser(user));
    localStorage.setItem("user", JSON.stringify(user));
  } catch {
    dispatch(deleteUser());
  }
};

/**
 * Logs the current user out, removes cookies
 *
 * @param {Dispatch} dispatch
 */
export const logout = async (dispatch: Dispatch): Promise<void> => {
  await api.post("/auth/logout");
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  await refetchUser(dispatch);
};
