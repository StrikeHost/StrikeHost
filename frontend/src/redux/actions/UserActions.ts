import { User } from "interfaces/User";
import { AnyAction } from "redux";

export const setUser = (user: User): AnyAction => ({
  type: "SET_USER",
  user,
});

export const deleteUser = (): AnyAction => ({
  type: "DELETE_USER",
});
