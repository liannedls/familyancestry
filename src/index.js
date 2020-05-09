import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './frontend/App';
import Timelinepage from './frontend/TimelinePage';
import Tree from './frontend/Tree.tsx';
import Contact from './frontend/Contact';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import Navigation from './frontend/Navigation';

const routing = (

  <Router>
    <div>
      <Navigation />
    <Route exact path="/" component={App} />
      <Route path="/timelinepage" component={Timelinepage} />
      <Route path="/contact" component={Contact} />
      <Route path="/tree" component={Tree} />
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'))
