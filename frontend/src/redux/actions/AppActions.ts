import { AnyAction } from "redux";

import { BreadcrumbTrail } from "components/Breadcrumbs";

export const setBreadcrumbs = (breadcrumbs: BreadcrumbTrail[]): AnyAction => ({
  type: "SET_BREADCRUMBS",
  breadcrumbs,
});

export const pushBreadcrumb = (breadcrumb: BreadcrumbTrail): AnyAction => ({
  type: "PUSH_BREADCRUMB",
  breadcrumb,
});

export const popBreadcrumb = (): AnyAction => ({
  type: "POP_BREADCRUMB",
});

export const toggleBreadcrumbs = (): AnyAction => ({
  type: "TOGGLE_BREADCRUMBS",
});
