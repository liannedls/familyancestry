import React, { Component } from 'react'
import {
  Timeline,
  Events,
  UrlButton,
  ImageEvent,
  TextEvent,
} from '@merc/react-timeline';

export class Timeline2 extends Component {
  render() {
    return (
        <div id="timeline">
        <Timeline>
          <Events>
          {this.props.data ? this.props.data.map(d =>
            <TextEvent date={d ?d.address : 'loading'} text="**Markdown** is *supported*" />
          ): 'loading'}


            <TextEvent
             date="1/2/19"
             text="Events alternate by default (given enough space in the browser)"
             />

           <ImageEvent
             date="4/13/19"
             text="You can embed images..."
             src="https://res.cloudinary.com/dovoq8jou/image/upload/v1564772194/jellyfish.jpg"
             alt="jellyfish swimming"
             credit="Photo by [@tavi004](https://unsplash.com/@tavi004)"
           >
             <div>
               <UrlButton href="https://unsplash.com/search/photos/undersea">
                 View more undersea photos
               </UrlButton>
             </div>
             </ImageEvent>
           </Events>
         </Timeline>
   </div>
    )
  }
}

export default Timeline2
