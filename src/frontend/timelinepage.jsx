import React, { Component } from 'react'
import Timeline2 from './timeline';
import $ from 'jquery';

export class Timelinepage extends Component {
  state = {
      resumeData : {},
    }
    getResumeData(){
      $.ajax({
        url:'/data.json',
        dataType:'json',
        cache: false,
        success: function(data){
          this.setState({resumeData: data});
        }.bind(this),
        error: function(xhr, status, err){
          console.log(err);
          alert(err);
        }
      });
    }

    componentDidMount(){
      this.getResumeData();
    }
  render() {
    return (

        <div id="timelinepage">
        <Timeline2  data={this.state.resumeData.Contact}/>
      </div>
    )
  }
}

export default Timelinepage
