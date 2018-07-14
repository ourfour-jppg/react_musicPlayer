import React, { Component } from 'react';
import { connect } from 'react-redux'
class App extends Component {
  constructor(props){
      super(props);
      this.state={
        
      }
    }
  render() {
    console.log(1)
    return (
      <div >
        <audio src="http://59.37.84.4/mp3.9ku.com/m4a/183203.m4a" id="myAudio">

        </audio>
      </div>
    );
  }
}

export default connect(
  (state)=>{
    return {
        state: state
    }
}
)(App);
