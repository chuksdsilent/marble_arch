import React from "react";

import Interceptor from "./services/interceptor";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Theme from "./assets/styles/Theme";
import { Provider } from "react-redux";
import "antd/dist/antd.css";
import "react-toastify/dist/ReactToastify.css";
import { persistor, store } from "./noautharea/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter as Router } from "react-router-dom";
// import HTTP request interceptor

// instantiate interceptor
new Interceptor().intercept();
new Interceptor().interceptResponse();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Theme>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Theme>
    </Router>
  </Provider>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
