import React, { Component } from 'react'
import TimelineElement from './Timeline';
import $ from 'jquery';

export class Timelinepage extends Component {
  state = {
    resumeData: {},
  }
  getResumeData() {
    $.ajax({
      url: '/familyevents.json',
      dataType: 'json',
      cache: false,
      success: function (data) {
        this.setState({ resumeData: data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.log(err);
        alert(err);
      }
    });
  }

  componentDidMount() {
    this.getResumeData();
  }


  render() {
    return (

      <div id="timelinepage#">
        <TimelineElement data={this.state.resumeData.Timeline} />
      </div>
    )
  }
}

export default Timelinepage
