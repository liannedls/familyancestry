import React, { Component } from 'react'
import ConnectElements from 'react-connect-elements';
import data from '../familytree.json';
import Collapse from "@kunukn/react-collapse";

export class Tree extends Component {
  constructor() {
    super();

    this.state = {
       data: data.familytree,
       isOpenBol: false
    }
    this.onToggle = this.onToggle.bind(this);
 }

 onToggle(event) {
   // "this is undefined??" <--- here
   //this.setState({isOpenBol: !this.state.isOpenBol})
  this.setState({isOpenBol: true})

   //this.props.onToggle()
 }

  render() {
    return (
      <div className="container">
        <header>
          <a href="https://github.com/emersonlaurentino/react-connect-elements">
            <h1>{this.state.data[0].text}React Connect Elements</h1>
          </a>
        </header>
        <button onClick={this.onToggle}>
          toggle
        </button>
        <Collapse isOpen={this.state.isOpenBol} >
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
        </Collapse>
        <footer>
          <span>
            by <a href="https://github.com/emersonlaurentino">@emersonlaurentino</a>
          </span>
        </footer>
        <ConnectElements
          selector=".elements"
          overlay={10}
          color= "blue"
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
    )
  }
}
export default Tree
