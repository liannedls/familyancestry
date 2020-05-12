import React, { Component } from 'react'

class Navigation extends Component {

  render() {
    return (
        <nav id="menu" className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav navbar-center">
              <li><a href="/" >Family de la Salle</a></li>
              <li><a href="/timelinepage">Timeline</a></li>

              <li><a href="/tree" >Family Tree</a></li>
              <li><a href="/contact" >Contact</a></li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navigation
