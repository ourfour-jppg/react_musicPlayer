import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Flex } from 'antd-mobile';

class App extends Component {
	constructor(props){
      super(props);
      this.state={
        
      }
      console.log(Flex.Item)
    }
  render() {
    return (
      <div className="App">
        主页
        <Flex justify='center' >
          <Flex.Item >
            <div ></div>
          </Flex.Item>
          <Flex.Item>2</Flex.Item>
          <Flex.Item>3</Flex.Item>
        </Flex>
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

