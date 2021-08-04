import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Archive from "./frontend/Archive";
import App from "./frontend/App";
import Timelinepage from "./frontend/TimelinePage";
import PageNotJustBricks from "./frontend/pages/NotJustBricks";
import Tree from "./frontend/Tree";
import Contact from "./frontend/Contact";
import { HashRouter, Route } from "react-router-dom";
import Navigation from "./frontend/Navigation";
import "bootstrap/dist/css/bootstrap.min.css";

const routing = (
  <HashRouter basename="/">
    <div>
      <Navigation />
      <Route exact path="/" component={App} />
      <Route path="/timelinepage" component={Timelinepage} />
      <Route path="/contact" component={Contact} />
      <Route path="/tree" component={Tree} />
      <Route path="/NotJustBricks" component={PageNotJustBricks} />
    </div>
  </HashRouter>
);

ReactDOM.render(routing, document.getElementById("root"));
