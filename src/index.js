import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './frontend/App';
import Timelinepage from './frontend/TimelinePage';
import Tree from './frontend/Tree';
import Contact from './frontend/Contact';
import { HashRouter, Route } from 'react-router-dom'
import Navigation from './frontend/Navigation';


const routing = (

   <HashRouter basename='/'>
    <div>
      <Navigation />
    <Route exact path="/" component={App} />
      <Route path="/timelinepage" component={Timelinepage} />
      <Route path="/contact" component={Contact} />
      <Route path="/tree" component={Tree} />
    </div>

    </HashRouter>
)

ReactDOM.render(routing, document.getElementById('root'))
