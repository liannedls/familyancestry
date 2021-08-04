import React, { Component } from 'react'

import { Link } from 'react-router-dom';

export class NotJustBricks extends Component {

  render() {
    return (

      <div id="NotJustBricks">
        <div id="button_cust">
        <Link to="/timelinepage" className="btn btn-primary">Back</Link>
        </div>
        <img src={ require('./img/bricks_full.jpg') } />
      </div>
    )
  }
}

export default NotJustBricks
