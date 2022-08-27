import * as dotenv from "dotenv";
import { Styles } from "utils/styles";
import { Toaster } from "react-hot-toast";
import { io, Socket } from "socket.io-client";
import { connect, useDispatch } from "react-redux";
import { createContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  CategoryScale,
  Chart,
  LinearScale,
  LineElement,
  PointElement,
  Title,
} from "chart.js";

import { api } from "utils/api";
import { User } from "interfaces/User";
import { setUser } from "redux/actions/UserActions";
import { PrivateRoute } from "components/PrivateRoute";
import { RootContainer } from "containers/RootContainer";
import { HomeContainer } from "containers/HomeContainer";
import { LoginContainer } from "containers/LoginContainer";
import { GamesContainer } from "containers/admin/GamesContainer";
import { UsersContainer } from "containers/admin/users/UsersContainer";
import { DashboardContainer } from "containers/admin/DashboardContainer";
import { PageNotFoundContainer } from "containers/PageNotFoundContainer";
import { AgentsContainer } from "containers/admin/agents/AgentsContainer";
import { CreateGameContainer } from "containers/admin/CreateGameContainer";
import { ManageGameContainer } from "containers/admin/ManageGameContainer";
import { ManageImageContainer } from "containers/admin/ManageImageContainer";
import { CreateImageContainer } from "containers/admin/CreateImageContainer";
import { CreateVersionContainer } from "containers/admin/CreateVersionContainer";
import { ManageVersionContainer } from "containers/admin/ManageVersionContainer";
import { ManageUserContainer } from "containers/admin/users/ManageUserContainer";
import { InstancesContainer } from "containers/admin/instances/InstancesContainer";
import { ManageAgentContainer } from "containers/admin/agents/ManageAgentContainer";
import { CreateInstanceContainer } from "containers/Instance/CreateInstanceContainer";
import { AccountSettingsContainer } from "containers/account/AccountSettingsContainer";
import { InstanceOverviewContainer } from "containers/Instance/InstanceOverviewContainer";
import { ManageInstanceContainer } from "containers/admin/instances/ManageInstanceContainer";
import {
  RegisterFrontendConnectionEvent,
  SocketEventName,
} from "interfaces/WebsocketEvents";

dotenv.config();

declare global {
  interface Process {
    env: {
      REACT_APP_API_URL: string;
      REACT_APP_WEBSOCKET_URL: string;
    };
  }
}

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title);

let wsClient: Socket | undefined;

export interface SocketContextInterface {
  client?: Socket;
  openConnection: (userId: string, token?: string) => void;
}

const openConnection = (userId: string, token?: string) =>
  setTimeout(() => {
    wsClient = io(process.env.REACT_APP_WEBSOCKET_URL as string, {
      extraHeaders: {
        Authorization: `Bearer ${token ?? localStorage.getItem("token")}`,
      },
      autoConnect: false,
    });
    wsClient.connect();

    // Register frontend connection
    const event: RegisterFrontendConnectionEvent = {
      event: SocketEventName.REGISTER_FRONTEND_CONNECTION,
      data: {
        userId: userId,
      },
    };

    wsClient?.emit("message", event);
  }, 1000);

export const SocketContext = createContext<SocketContextInterface>({
  client: wsClient,
  openConnection,
});

export const App = connect()(() => {
  const dispatch = useDispatch();

  useEffect(() => {
    api.get<User>("/user").then((response) => {
      dispatch(setUser(response.data));

      openConnection(response.data.id);
    });

    return () => {
      if (wsClient) wsClient.close();
    };
  }, [dispatch]);

  return (
    <SocketContext.Provider value={{ client: wsClient, openConnection }}>
      <Styles />
      <Router>
        <Toaster />
        <RootContainer>
          <Switch>
            <Route exact path="/" component={HomeContainer} />
            <Route exact path="/login" component={LoginContainer} />
            <PrivateRoute
              exact
              path="/account"
              component={AccountSettingsContainer}
            />
            <PrivateRoute
              exact
              path="/instances/create"
              component={CreateInstanceContainer}
            />
            <PrivateRoute
              exact
              path="/instances/:instanceId"
              component={InstanceOverviewContainer}
            />
            <PrivateRoute
              exact
              path="/admin"
              adminOnly={true}
              component={DashboardContainer}
            />
            <PrivateRoute
              exact
              path="/admin/game"
              adminOnly={true}
              component={GamesContainer}
            />
            <PrivateRoute
              exact
              path="/admin/game/new"
              adminOnly={true}
              component={CreateGameContainer}
            />
            <PrivateRoute
              exact
              path="/admin/game/:gameId"
              adminOnly={true}
              component={ManageGameContainer}
            />
            <PrivateRoute
              exact
              path="/admin/game/:gameId/image/new"
              adminOnly={true}
              component={CreateImageContainer}
            />
            <PrivateRoute
              exact
              path="/admin/image/:imageId"
              adminOnly={true}
              component={ManageImageContainer}
            />
            <PrivateRoute
              exact
              path="/admin/image/:imageId/version/new"
              adminOnly={true}
              component={CreateVersionContainer}
            />
            <PrivateRoute
              exact
              path="/admin/image/:imageId/version/:versionId"
              adminOnly={true}
              component={ManageVersionContainer}
            />
            <PrivateRoute
              exact
              path="/admin/instance"
              adminOnly={true}
              component={InstancesContainer}
            />
            <PrivateRoute
              exact
              path="/admin/instance/:instanceId"
              adminOnly={true}
              component={ManageInstanceContainer}
            />
            <PrivateRoute
              exact
              path="/admin/agent"
              adminOnly={true}
              component={AgentsContainer}
            />
            <PrivateRoute
              exact
              path="/admin/agent/:agentId"
              adminOnly={true}
              component={ManageAgentContainer}
            />
            <PrivateRoute
              exact
              path="/admin/user"
              adminOnly={true}
              component={UsersContainer}
            />
            <PrivateRoute
              exact
              path="/admin/user/:userId"
              adminOnly={true}
              component={ManageUserContainer}
            />
            <Route component={PageNotFoundContainer} />
          </Switch>
        </RootContainer>
      </Router>
    </SocketContext.Provider>
  );
});

export default App;
