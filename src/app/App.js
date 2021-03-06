/**
 * Entry application component used to compose providers and render Routes.
 * */

import React from "react";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Routes } from "../app/Routes";
import SSOAuth from "./modules/Auth/components/SSOAuth";
import VersionChecker from "./modules/Auth/components/VersionChecker";

export default function App({ store, persistor, basename }) {
  return (
    /* Provide Redux store */
    <Provider store={store}>
      {/* Asynchronously persist redux stores and show `SplashScreen` while it's loading. */}
      <PersistGate persistor={persistor}>
        {/* Override `basename` (e.g: `homepage` in `package.json`) */}
        <HashRouter basename={basename}>
          {/* Render routes with provided `Layout`. */}
          <VersionChecker>
            <SSOAuth>
              <Routes />
            </SSOAuth>
          </VersionChecker>
        </HashRouter>
      </PersistGate>
    </Provider>
  );
}
