import React from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import TokenHandler from "./modules/Auth/components/TokenHandler";
import Login from "./modules/Auth/pages/Login";
import Logout from "./modules/Auth/pages/Logout";
import HOC from "./modules/Common/components/Hoc";
import Changepassword from "./modules/Auth/pages/Changepassword";

export default function BasePage(props) {
  return (
    <HOC>
      <Switch>
        {<Redirect exact from="/" to="/logout" />}

        <Route exact path="/login" component={Login} />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/changepassword" component={Changepassword} />

        {/* nothing match - redirect to error */}
        <Redirect to="/error" />
      </Switch>
      <TokenHandler></TokenHandler>
    </HOC>
  );
}
