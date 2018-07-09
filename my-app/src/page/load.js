import React, { Component } from 'react';
import { connect } from 'react-redux'
class App extends Component {
  constructor(props){
      super(props);
      this.state={
        
      }
    }
  render() {
    return (
      <div >
        载入页面
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
