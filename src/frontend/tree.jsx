import React, { Component } from 'react'
import ConnectElements from 'react-connect-elements';
import data from '../familytree.json';
import { Collapse } from 'reactstrap';

export class Tree extends Component {
  
  constructor() {
    super();
    this.state = {
       data: data.familytree,
       showHideFName: true,
       showHideLName: true
    }
    this.hideComponent = this.hideComponent.bind(this);
 }

 hideComponent(name) {
   switch (name) {
     case "showHideFName":
       this.setState({ showHideFName: !this.state.showHideFName });
       break;
     case "showHideLName":
       this.setState({ showHideLName: !this.state.showHideLName });
       break;
   }
 }
 onToggle(event) {this.setState({isOpenBol:!event})}

  render() {
    return (
      <div>
      <h1>{this.state.data[0].text}React Connect Elements</h1>
      <h1>{this.state.data[0].text}React Connect Elements</h1>
      <h1>{this.state.data[0].text}React Connect Elements</h1>
<button onClick={() => this.hideComponent("showHideFName")}>
        toggle
      </button>
      <Collapse isOpen={this.state.showHideFName} >
      <div className="container">
        <header>
          <a href="https://github.com/emersonlaurentino/react-connect-elements">
            <h1>{this.state.data[0].text}React Connect Elements</h1>
          </a>
        </header>
        <div className="elements">
          <div className="elements-row">
            <div className={this.state.data[3].class} style = {{backgroundColor:this.state.data[3].gender}}/>
            <div className={this.state.data[4].class} style = {{backgroundColor:this.state.data[4].gender}}/>
          </div>
          <div className="elements-row">
            <div className={this.state.data[0].class} style = {{backgroundColor:this.state.data[0].gender}} />
            <div className={this.state.data[1].class} style = {{backgroundColor:this.state.data[1].gender}} />
            <div className={this.state.data[2].class} style = {{backgroundColor:this.state.data[2].gender}} />
          </div>
        </div>
        <footer>
          <span>
            by <a href="https://github.com/emersonlaurentino">@emersonlaurentino</a>
          </span>
        </footer>
        <ConnectElements
          selector=".elements"
          overlay={10}
          color= "pink"
          elements={[

                        { from: '.element3', to: '.element4', color: "red" },
            { from: '.element3', to: '.element0' },
            { from: '.element3', to: '.element1' },
            { from: '.element3', to: '.element2' },

            { from: '.element4', to: '.element0' },
            { from: '.element4', to: '.element1' },
            { from: '.element4', to: '.element2' },

          ]}
        />

</div>

</Collapse>
</div>
    )
  }
}
export default Tree
