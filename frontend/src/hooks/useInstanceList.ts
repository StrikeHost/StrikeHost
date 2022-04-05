import _ from "lodash";
import { api } from "utils/api";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Instance } from "interfaces/Instance";
import { RootState } from "redux/reducers/RootReducer";
import { setInstances } from "redux/actions/InstancesActions";

/**
 * Hook to get the list of instances
 *
 * @returns {{isLoading: boolean, instances: Instance[]}}
 */
export const useInstanceList = () => {
  const dispatch = useDispatch();
  const instancesSelector = useSelector(
    (state: RootState) => state.instancesState.instances,
    _.isEqual
  );

  const [isLoading, setIsLoading] = useState(!instancesSelector.length);

  useEffect(() => {
    if (!instancesSelector.length) {
      api.get<Instance[]>("/instance").then((res) => {
        dispatch(setInstances(res.data));
        setIsLoading(false);
      });
    }
  }, [instancesSelector]);

  return { isLoading, instances: instancesSelector };
};
