import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import jpg from './404.js';
import './404.css';
import {
    Link
} from 'react-router-dom';
class App extends Component {
  constructor(props){
      super(props);
      this.state={
        skip:false
      }
    }
  end(){
    this.props.history.goBack()
  }
  render() {
    console.log(this)
    return (
      <div id='A404'>
          <div className='top'><i className='iconfont icon-quxiao' onClick={this.end.bind(this)}></i> <span>提示</span></div>
          <span ></span>
          <p>此页正在建设中.....</p>
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
