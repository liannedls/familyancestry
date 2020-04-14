import React, { Component } from 'react'
import {Timeline, Events, ImageEvent} from '@merc/react-timeline';

export class TimelineElement extends Component {
  render() {
    return (
        <div id="timeline">
        <Timeline>
          <Events>
          {this.props.data ? this.props.data.map(d =>
            <ImageEvent
            date={d ?d.date : 'loading'}
            text={d ?d.text : 'loading'}
            src={d ?d.src : 'loading'}
            credit={d ?d.textBelow : 'loading'}
            />
          ): 'loading'}
           </Events>
         </Timeline>
   </div>
    )
  }
}

export default TimelineElement
