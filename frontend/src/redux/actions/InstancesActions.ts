import { AnyAction } from "redux";

import { Instance, InstanceStatusType } from "interfaces/Instance";

export const addInstance = (instance: Instance): AnyAction => ({
  type: "ADD_INSTANCE",
  instance,
});

export const removeInstance = (instance: Instance): AnyAction => ({
  type: "REMOVE_INSTANCE",
  instance,
});

export const updateInstance = (instance: Instance): AnyAction => ({
  type: "UPDATE_INSTANCE",
  instance,
});

export const setInstances = (instances: Instance[]): AnyAction => ({
  type: "SET_INSTANCES",
  instances,
});

export const setInstanceState = (
  instanceId: string,
  status: InstanceStatusType
) => ({
  type: "SET_INSTANCE_STATE",
  instanceId,
  status,
});
