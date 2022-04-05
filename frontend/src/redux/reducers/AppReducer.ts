import { AnyAction } from "redux";

import { BreadcrumbTrail } from "components/Breadcrumbs";

export interface AppState {
  showBreadcrumbs: boolean;
  breadcrumbs: BreadcrumbTrail[];
}

const INITIAL_STATE: AppState = {
  showBreadcrumbs: true,
  breadcrumbs: [],
};

export const AppReducer = (
  state: AppState = INITIAL_STATE,
  action: AnyAction
): AppState => {
  switch (action.type) {
    case "PUSH_BREADCRUMB":
      return {
        ...state,
        breadcrumbs: [...state.breadcrumbs, action.breadcrumb],
      };
    case "POP_BREADCRUMB":
      return {
        ...state,
        breadcrumbs: state.breadcrumbs.slice(0, -1),
      };
    case "SET_BREADCRUMBS":
      return {
        ...state,
        breadcrumbs: action.breadcrumbs,
      };
    case "TOGGLE_BREADCRUMBS":
      return {
        ...state,
        showBreadcrumbs: !state.showBreadcrumbs,
      };
    default:
      return state;
  }
};
