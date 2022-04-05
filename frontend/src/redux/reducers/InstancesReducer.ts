import { AnyAction } from "redux";

import { Instance } from "interfaces/Instance";

export interface InstancesState {
  instances: Instance[];
}

const INITIAL_STATE: InstancesState = {
  instances: [],
};

export const InstancesReducer = (
  state: InstancesState = INITIAL_STATE,
  action: AnyAction
): InstancesState => {
  switch (action.type) {
    case "ADD_INSTANCE": {
      return {
        ...state,
        instances: [
          ...state.instances.filter(
            (instance) => instance.id !== action.instance.id
          ),
          action.instance,
        ],
      };
    }
    case "REMOVE_INSTANCE":
      return {
        ...state,
        instances: state.instances.filter(
          (instance) => instance.id !== action.instance.id
        ),
      };
    case "UPDATE_INSTANCE":
      return {
        ...state,
        instances: state.instances.map((instance) =>
          instance.id === action.instance.id
            ? { ...instance, ...action.instance }
            : instance
        ),
      };
    case "SET_INSTANCES":
      return {
        ...state,
        instances: action.instances,
      };
    case "SET_INSTANCE_STATE": {
      const tempInstances = state.instances.map((instance) => {
        if (instance.id === action.instanceId) {
          return {
            ...instance,
            status: action.status,
          };
        }

        return instance;
      });

      return {
        ...state,
        instances: tempInstances,
      };
    }
    default:
      return state;
  }
};
