import React, { Component } from 'react'
import {Timeline, Events, ImageEvent} from '@merc/react-timeline';

class TimelineElement extends Component {

  render() {
    const convert = Object.values(this.props);
    const result = convert[0];

    return (
        <div id="timeline">
        <Timeline>
          <Events   styles = {{color:"blue", backgroundColor:"blue", width: "50%"}}>
          {result ? result.sort(function(a, b) {
        // convert date object into number to resolve issue in typescript
        return  +new Date(a.date) - +new Date(b.date);
      }).map(d =>
            <ImageEvent
            date={d ? d.date : 'loading'}
            text={d ?d.text : 'loading'}
            src={d ?d.src : 'loading'}
            credit={d ?d.textBelow : 'loading'}

                      />
          ): 'loading'        }
           </Events>
         </Timeline>
   </div>
    )
  }
}

export default TimelineElement
