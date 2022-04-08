import React from "react";
import ReactDOM from "react-dom";
import Bugsnag from "@bugsnag/js";
import { createStore } from "redux";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import BugsnagPluginReact from "@bugsnag/plugin-react";

import App from "./App";
import { rootReducer } from "redux/reducers/RootReducer";

if (process.env.NODE_ENV !== "development") {
  Bugsnag.start({
    apiKey: "db3f0b9b86a138caccfb702fd123a187",
    plugins: [new BugsnagPluginReact()],
  });
}

export const store = createStore(rootReducer);
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const ErrorBoundary = Bugsnag.getPlugin("react").createErrorBoundary(React);

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById("root")
);
