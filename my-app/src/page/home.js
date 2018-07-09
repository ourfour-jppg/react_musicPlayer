import React, { Component } from 'react';
import { connect } from 'react-redux';
class App extends Component {
	constructor(props){
      super(props);
      this.state={
        
      }
    }
  render() {
    return (
      <div className="App">
        主页
        {this.state.aa}
      </div>
    );
  }
};
export default connect(
	(state)=>{
    return {
        state: state
    }
}
)(App);

