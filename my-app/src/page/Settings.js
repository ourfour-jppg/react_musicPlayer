import React, { Component } from 'react';
import { connect } from 'react-redux'
class App extends Component {
  constructor(props){
      super(props);
      this.state={

      }
    }
  render() {
     setTimeout(()=>{this.props.state.aa=0},1000)
    return (
        <div style = {{width:'50px'}}>
          设置页
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
