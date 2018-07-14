import React, { Component } from 'react';
import { connect } from 'react-redux';


import {
  Route,
} from 'react-router-dom';

//引入iconfont.css
import '../iconfont/iconfont.css';

//头部组件
import Hheader from '../components/home/hheader/hheader';
import Hfooter from '../components/home/hfooter/hfooter';
import Hbody from '../components/home/hbody/hbody';
import  userSongsMenu  from './userSongsMenu';

class App extends Component {
	constructor(props){
      super(props);
      this.state={
        
      }
    }
  render() {
    return (
      <div className="App" style={{display:'flex',flexDirection:'column',height:'100%',width:'100%'}}>
        <Hheader />
        <Route path="/home" component={Hbody}/>
        <Route path="/home/userSongsMenu" component={userSongsMenu}/>
        <Hfooter />
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
