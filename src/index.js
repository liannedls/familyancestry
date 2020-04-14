import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './frontend/App';
import Timelinepage from './frontend/timelinepage';
import Tree from './frontend/tree';
import Gallery from './frontend/gallery';
import Contact from './frontend/contact';
import { Route, BrowserRouter as Router } from 'react-router-dom'

const routing = (

  <Router>
    <div>
    <Route path="/" component={App} />
      <Route path="/timelinepage" component={Timelinepage} />
      <Route path="/contact" component={Contact} />
      <Route path="/tree" component={Tree} />
      <Route path="/gallery" component={Gallery} />
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'))
