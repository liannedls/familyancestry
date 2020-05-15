import React, { Component } from 'react'

import { Link } from 'react-router-dom'

class Navigation extends Component {

  render() {
    return (
        <nav id="menu" className="navbar navbar-default navbar-fixed-top">
        <div className="container">
        <div className="navbar-header">
        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
        <span className="sr-only">Toggle navigation</span> <span className="icon-bar"></span> <span className="icon-bar"></span> <span className="icon-bar"></span>
        </button>

          <Link to="/" className="navbar-brand page-scroll" >Famille de la Salle</Link>
        </div>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav navbar-center">
              <li><Link to="/timelinepage">Timeline</Link></li>

              <li><Link to="/tree" >Family Tree</Link></li>
              <li><Link to="/contact" >Contact</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navigation
