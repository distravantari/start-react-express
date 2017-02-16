import React from "react";

// component
import Authentication from "az-client/components/Authentication";
import DropFile from "az-client/components/Dropfile";
import Webcam from "az-client/components/Webcam";

// pages
import Index from "az-client/pages/index";

import { Router, Route, useRouterHistory, IndexRoute } from "react-router";

import createHashHistory from "history/lib/createHashHistory";
const history = useRouterHistory(createHashHistory)({});

export default(
  <Router history={history} onUpdate={() => window.scrollTo(0, 0)}>
    <Route path="/" component={ Index } >
      <Route path="/home" component={ DropFile }/>
      <Route path="/Cam" component={ Webcam }/>
      <IndexRoute component={ Authentication } />
    </Route>
  </Router>
);
